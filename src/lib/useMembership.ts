"use client";

import { useState, useEffect } from "react";
import { supabase } from "./supabase";
import { useAuth } from "./AuthContext";

export type Plan = "free" | "pro";

interface Membership {
  plan: Plan;
  expiresAt: string | null;
}

export function useMembership() {
  const { user } = useAuth();
  const [membership, setMembership] = useState<Membership>({ plan: "free", expiresAt: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setMembership({ plan: "free", expiresAt: null });
      setLoading(false);
      return;
    }

    supabase
      .from("memberships")
      .select("plan, expires_at")
      .eq("user_id", user.id)
      .single()
      .then(({ data }) => {
        if (data) {
          const isExpired = data.expires_at && new Date(data.expires_at) < new Date();
          setMembership({
            plan: isExpired ? "free" : (data.plan as Plan),
            expiresAt: data.expires_at,
          });
        }
        setLoading(false);
      });
  }, [user]);

  const isPro = membership.plan === "pro";

  return { ...membership, isPro, loading };
}
