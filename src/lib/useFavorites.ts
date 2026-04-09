"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "./supabase";
import { useAuth } from "./AuthContext";

export function useFavorites() {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) { setFavorites([]); return; }
    setLoading(true);
    supabase
      .from("favorites")
      .select("tool_id")
      .eq("user_id", user.id)
      .then(({ data }) => {
        setFavorites(data?.map((d) => d.tool_id) ?? []);
        setLoading(false);
      });
  }, [user]);

  const isFavorite = useCallback((toolId: string) => favorites.includes(toolId), [favorites]);

  const toggleFavorite = useCallback(async (toolId: string) => {
    if (!user) return false; // not logged in

    if (favorites.includes(toolId)) {
      setFavorites((prev) => prev.filter((id) => id !== toolId));
      await supabase.from("favorites").delete().eq("user_id", user.id).eq("tool_id", toolId);
    } else {
      setFavorites((prev) => [...prev, toolId]);
      await supabase.from("favorites").insert({ user_id: user.id, tool_id: toolId });
    }
    return true;
  }, [user, favorites]);

  return { favorites, isFavorite, toggleFavorite, loading };
}
