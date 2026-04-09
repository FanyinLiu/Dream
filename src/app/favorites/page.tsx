"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import { useFavorites } from "@/lib/useFavorites";
import { getToolById } from "@/data/tools";
import { ToolCard } from "@/components/tool";

export default function FavoritesPage() {
  const { user } = useAuth();
  const { favorites, loading } = useFavorites();

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <Heart className="w-12 h-12 text-atmospheric/40 mx-auto mb-6" />
        <h1 className="text-3xl text-white mb-4">我的收藏</h1>
        <p className="text-on-surface/40 mb-8">登录后即可收藏工具，随时查看</p>
        <p className="text-sm text-on-surface/30">请先登录</p>
      </div>
    );
  }

  const tools = favorites.map(getToolById).filter(Boolean);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl text-white mb-3">我的收藏</h1>
        <p className="text-on-surface/40 font-light">
          {loading ? "加载中..." : `共收藏 ${tools.length} 款工具`}
        </p>
      </div>

      {tools.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {tools.map((tool) => (
            <ToolCard key={tool!.id} tool={tool!} />
          ))}
        </div>
      ) : (
        !loading && (
          <div className="text-center py-20">
            <p className="text-xl text-on-surface/40 mb-4">还没有收藏</p>
            <Link href="/categories" className="text-sm text-atmospheric hover:text-white transition-colors">
              去发现工具 →
            </Link>
          </div>
        )
      )}
    </div>
  );
}
