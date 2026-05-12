"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { cn, getRatingColor, getRatingBg, formatMarketValue, getPositionLabel } from "@/lib/utils";
import { Flag, Shield, Calendar, TrendingUp, Heart } from "lucide-react";
import { useFavoritesStore } from "@/stores/favoritesStore";

interface PlayerCardProps {
  player: any;
  index: number;
}

export function PlayerCard({ player, index }: PlayerCardProps) {
  const router = useRouter();
  const rating = player.stats?.overallRating || 0;
  
  const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore();
  const favorite = isFavorite(player.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (favorite) {
      removeFavorite(player.id);
    } else {
      addFavorite({
        id: player.id,
        fullName: player.fullName,
        currentClub: player.currentClub,
        primaryPosition: player.primaryPosition,
        age: player.age,
        nationality: player.nationality,
        marketValue: player.marketValue,
        overallRating: player.stats?.overallRating || 0,
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      onClick={() => router.push(`/players/${player.id}`)}
      className={cn(
        "group relative cursor-pointer overflow-hidden rounded-2xl",
        "bg-navy-900 border border-navy-700/50",
        "hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10",
        "transition-all duration-300"
      )}
    >
      {/* Botón de favorito */}
      <button
        onClick={handleFavoriteClick}
        className={cn(
          "absolute top-3 left-3 z-20 p-2 rounded-full transition-all",
          favorite 
            ? "bg-red-500/20 text-red-400 border border-red-500/30" 
            : "bg-navy-900/80 text-gray-400 border border-navy-700 hover:text-red-400"
        )}
      >
        <Heart className={cn("w-4 h-4", favorite && "fill-current")} />
      </button>

      <div className="relative h-32 bg-gradient-to-br from-navy-800 to-navy-900">
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-transparent to-transparent" />
        <div className="absolute top-3 right-3">
          <div className={cn(
            "flex items-center justify-center w-12 h-12 rounded-xl",
            "bg-navy-900/90 backdrop-blur-sm border border-navy-700",
            "shadow-lg"
          )}>
            <span className={cn("text-xl font-bold", getRatingColor(rating))}>
              {rating}
            </span>
          </div>
        </div>
        <div className="absolute top-3 left-12">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-navy-900/80 backdrop-blur-sm border border-navy-700">
            <Shield className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-medium text-gray-300">{player.currentClub}</span>
          </div>
        </div>
      </div>

      <div className="relative px-4 -mt-12">
        <div className="relative w-24 h-24 mx-auto">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 p-0.5">
            <div className="w-full h-full rounded-full bg-navy-900 p-0.5">
              {player.photoUrl ? (
                <Image src={player.photoUrl} alt={player.fullName} fill className="rounded-full object-cover" />
              ) : (
                <div className="w-full h-full rounded-full bg-navy-800 flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-400">
                    {player.firstName[0]}{player.lastName[0]}
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-blue-600 text-[10px] font-bold text-white whitespace-nowrap">
            {getPositionLabel(player.primaryPosition)}
          </div>
        </div>
      </div>

      <div className="p-4 pt-3 text-center">
        <h3 className="text-lg font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">
          {player.fullName}
        </h3>
        <div className="flex items-center justify-center gap-3 text-sm text-gray-400 mb-3">
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {player.age} años
          </span>
          <span className="flex items-center gap-1">
            <Flag className="w-3.5 h-3.5" />
            {player.nationality}
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2 mb-3">
          <StatPreview label="ATA" value={player.stats?.finishing || 0} />
          <StatPreview label="TEC" value={player.stats?.dribbling || 0} />
          <StatPreview label="FIS" value={player.stats?.strength || 0} />
        </div>
        <div className="flex items-center justify-center gap-1 text-sm">
          <TrendingUp className="w-4 h-4 text-emerald-400" />
          <span className="text-emerald-400 font-semibold">
            {formatMarketValue(player.marketValue)}
          </span>
        </div>
      </div>
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </motion.div>
  );
}

function StatPreview({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-navy-800/50 rounded-lg p-2">
      <div className="text-[10px] text-gray-500 mb-1">{label}</div>
      <div className="text-sm font-bold text-white">{value}</div>
      <div className="mt-1 h-1 rounded-full bg-navy-700 overflow-hidden">
        <div className={cn("h-full rounded-full transition-all", getRatingBg(value))} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}