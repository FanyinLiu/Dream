"use client";

import { supabase } from "./supabase";

export function track(event: string, props?: Record<string, string>) {
  // Fire and forget — don't block UI
  supabase.from("events").insert({
    event,
    props: props ?? {},
    url: typeof window !== "undefined" ? window.location.pathname : "",
    timestamp: new Date().toISOString(),
  }).then(() => {});
}
