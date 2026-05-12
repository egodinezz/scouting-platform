"use client";

import { motion, AnimatePresence } from "framer-motion";
import { PlayerCard } from "@/components/players/PlayerCard";
import { PlayerSearch } from "@/components/players/PlayerSearch";
import { PlayerFilters } from "@/components/players/PlayerFilters";
import { usePlayerStore } from "@/stores/playerStore";
import { usePlayersStore } from "@/stores/playersStore";
import { LayoutGrid, List, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function PlayersPage() {
  const { viewMode, setViewMode, filters } = usePlayerStore();
  const { players } = usePlayersStore();
  const [showFilters, setShowFilters] = useState(false);

  const filteredPlayers = players.filter((player) => {
    const matchesSearch = player.fullName.toLowerCase().includes(filters.search.toLowerCase()) ||
                         player.currentClub.toLowerCase().includes(filters.search.toLowerCase()) ||
                         player.nationality.toLowerCase().includes(filters.search.toLowerCase());
    const matchesPosition = filters.positions.length === 0 || filters.positions.includes(player.primaryPosition as any);
    const matchesAge = player.age >= filters.minAge && player.age <= filters.maxAge;
    const matchesRating = !player.stats || (
      player.stats.overallRating >= filters.minRating && 
      player.stats.overallRating <= filters.maxRating
    );
    return matchesSearch && matchesPosition && matchesAge && matchesRating;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Base de Datos</h1>
          <p className="text-gray-500 mt-1">{filteredPlayers.length} jugadores encontrados</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-xl border transition-all",
              showFilters
                ? "bg-blue-500/10 border-blue-500/30 text-blue-400"
                : "bg-navy-800 border-navy-700 text-gray-400 hover:text-white"
            )}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span className="text-sm font-medium">Filtros</span>
          </button>

          <div className="flex bg-navy-800 rounded-xl p-1 border border-navy-700">
            <button
              onClick={() => setViewMode("grid")}
              className={cn(
                "p-2 rounded-lg transition-all",
                viewMode === "grid" ? "bg-navy-700 text-white" : "text-gray-500 hover:text-gray-300"
              )}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={cn(
                "p-2 rounded-lg transition-all",
                viewMode === "list" ? "bg-navy-700 text-white" : "text-gray-500 hover:text-gray-300"
              )}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <PlayerSearch />
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <PlayerFilters />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.div
        layout
        className={cn(
          viewMode === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            : "flex flex-col gap-4"
        )}
      >
        {filteredPlayers.map((player, index) => (
          <PlayerCard key={player.id} player={player} index={index} />
        ))}
      </motion.div>

      {filteredPlayers.length === 0 && (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-bold text-white mb-2">No se encontraron jugadores</h3>
          <p className="text-gray-500">Intenta ajustar los filtros de búsqueda</p>
        </div>
      )}
    </div>
  );
}