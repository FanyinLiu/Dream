import { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Supabase admin not configured");
  return createClient(url, key);
}

function verifySignature(payload: string, signature: string, secret: string): boolean {
  const hmac = crypto.createHmac("sha256", secret);
  const digest = hmac.update(payload).digest("hex");
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest));
}

export async function POST(req: NextRequest) {
  const secret = process.env.LEMON_WEBHOOK_SECRET;
  if (!secret) {
    return Response.json({ error: "Webhook secret not configured" }, { status: 500 });
  }

  const rawBody = await req.text();
  const signature = req.headers.get("x-signature") ?? "";

  if (!verifySignature(rawBody, signature, secret)) {
    return Response.json({ error: "Invalid signature" }, { status: 401 });
  }

  const event = JSON.parse(rawBody);
  const eventName = event.meta?.event_name;
  const userId = event.meta?.custom_data?.user_id;

  if (!userId) {
    return Response.json({ error: "No user_id in custom data" }, { status: 400 });
  }

  const attrs = event.data?.attributes ?? {};

  if (eventName === "order_created") {
    // One-time or first subscription payment
    await getSupabaseAdmin().from("memberships").upsert({
      user_id: userId,
      plan: "pro",
      lemon_customer_id: String(attrs.customer_id ?? ""),
      lemon_order_id: String(attrs.identifier ?? event.data?.id ?? ""),
      updated_at: new Date().toISOString(),
    }, { onConflict: "user_id" });
  }

  if (eventName === "subscription_created" || eventName === "subscription_updated") {
    const status = attrs.status; // active, past_due, cancelled, expired
    const renewsAt = attrs.renews_at;
    const endsAt = attrs.ends_at;

    await getSupabaseAdmin().from("memberships").upsert({
      user_id: userId,
      plan: status === "active" || status === "past_due" ? "pro" : "free",
      lemon_subscription_id: String(event.data?.id ?? ""),
      lemon_customer_id: String(attrs.customer_id ?? ""),
      expires_at: endsAt ?? renewsAt ?? null,
      updated_at: new Date().toISOString(),
    }, { onConflict: "user_id" });
  }

  if (eventName === "subscription_cancelled" || eventName === "subscription_expired") {
    await getSupabaseAdmin().from("memberships").upsert({
      user_id: userId,
      plan: "free",
      expires_at: attrs.ends_at ?? new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }, { onConflict: "user_id" });
  }

  return Response.json({ ok: true });
}
