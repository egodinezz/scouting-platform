"use client";

import { motion } from "framer-motion";
import { Star, Heart, TrendingUp, Trash2 } from "lucide-react";
import { cn, formatMarketValue, getRatingColor } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useFavoritesStore } from "@/stores/favoritesStore";

export default function FavoritesPage() {
  const router = useRouter();
  const { favorites, removeFavorite } = useFavoritesStore();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Favoritos</h1>
        <p className="text-gray-500 mt-1">{favorites.length} jugadores en tu lista</p>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">⭐</div>
          <h3 className="text-xl font-bold text-white mb-2">No tienes favoritos</h3>
          <p className="text-gray-500">Ve a Jugadores y haz clic en el corazón para agregarlos</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((player, index) => (
            <motion.div
              key={player.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-panel p-6 cursor-pointer hover:border-blue-500/30 transition-all group"
            >
              <div className="flex items-start justify-between mb-4">
                <div 
                  className="flex items-center gap-3 flex-1"
                  onClick={() => router.push(`/players/${player.id}`)}
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-xl">
                    {player.fullName.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                      {player.fullName}
                    </h3>
                    <p className="text-sm text-gray-400">{player.currentClub}</p>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFavorite(player.id);
                  }}
                  className="p-2 rounded-lg text-red-400 hover:bg-red-500/20 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              <div 
                className="grid grid-cols-3 gap-3 mb-4"
                onClick={() => router.push(`/players/${player.id}`)}
              >
                <div className="bg-navy-800/50 rounded-lg p-2 text-center">
                  <div className={cn("text-lg font-bold", getRatingColor(player.overallRating))}>
                    {player.overallRating}
                  </div>
                  <div className="text-xs text-gray-500">Rating</div>
                </div>
                <div className="bg-navy-800/50 rounded-lg p-2 text-center">
                  <div className="text-lg font-bold text-white">{player.age}</div>
                  <div className="text-xs text-gray-500">Edad</div>
                </div>
                <div className="bg-navy-800/50 rounded-lg p-2 text-center">
                  <div className="text-lg font-bold text-emerald-400">
                    {formatMarketValue(player.marketValue)}
                  </div>
                  <div className="text-xs text-gray-500">Valor</div>
                </div>
              </div>

              <div 
                className="flex items-center justify-between"
                onClick={() => router.push(`/players/${player.id}`)}
              >
                <span className="px-2 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-medium">
                  {player.primaryPosition}
                </span>
                <span className="text-xs text-gray-400">{player.nationality}</span>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}