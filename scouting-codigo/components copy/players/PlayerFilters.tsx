"use client";

import { motion } from "framer-motion";
import { usePlayerStore, Position } from "@/stores/playerStore";
import { cn } from "@/lib/utils";
import { getPositionLabel } from "@/lib/utils";
import { SlidersHorizontal, RotateCcw } from "lucide-react";

const positions: Position[] = ["GK", "CB", "LB", "RB", "DM", "CM", "AM", "LW", "RW", "SS", "ST"];

const clubs = ["Real Madrid", "Barcelona", "Manchester City", "Liverpool", "Bayern Munich", "PSG", "Arsenal", "Chelsea"];
const nationalities = ["España", "Inglaterra", "Francia", "Alemania", "Brasil", "Argentina", "Portugal", "Países Bajos"];

export function PlayerFilters() {
  const { filters, setFilters, resetFilters } = usePlayerStore();

  const togglePosition = (pos: Position) => {
    const newPositions = filters.positions.includes(pos)
      ? filters.positions.filter((p) => p !== pos)
      : [...filters.positions, pos];
    setFilters({ positions: newPositions });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-panel p-6 space-y-6"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-white font-semibold">
          <SlidersHorizontal className="w-5 h-5 text-blue-400" />
          Filtros Avanzados
        </div>
        <button
          onClick={resetFilters}
          className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Resetear
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm text-gray-400 mb-2 block">Posiciones</label>
          <div className="flex flex-wrap gap-2">
            {positions.map((pos) => (
              <button
                key={pos}
                onClick={() => togglePosition(pos)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
                  filters.positions.includes(pos)
                    ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                    : "bg-navy-800 text-gray-400 border border-navy-700 hover:text-white"
                )}
              >
                {getPositionLabel(pos)}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Edad: {filters.minAge} - {filters.maxAge} años</label>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="15"
                max="45"
                value={filters.minAge}
                onChange={(e) => setFilters({ minAge: parseInt(e.target.value) })}
                className="flex-1 accent-blue-500"
              />
              <input
                type="range"
                min="15"
                max="45"
                value={filters.maxAge}
                onChange={(e) => setFilters({ maxAge: parseInt(e.target.value) })}
                className="flex-1 accent-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-2 block">Rating: {filters.minRating} - {filters.maxRating}</label>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="0"
                max="100"
                value={filters.minRating}
                onChange={(e) => setFilters({ minRating: parseInt(e.target.value) })}
                className="flex-1 accent-blue-500"
              />
              <input
                type="range"
                min="0"
                max="100"
                value={filters.maxRating}
                onChange={(e) => setFilters({ maxRating: parseInt(e.target.value) })}
                className="flex-1 accent-blue-500"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
