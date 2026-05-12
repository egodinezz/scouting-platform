"use client";

import { Search, X } from "lucide-react";
import { usePlayerStore } from "@/stores/playerStore";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

export function PlayerSearch() {
  const { filters, setFilters } = usePlayerStore();
  const [localSearch, setLocalSearch] = useState(filters.search);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFilters({ search: localSearch });
    }, 300);
    return () => clearTimeout(timeout);
  }, [localSearch, setFilters]);

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
      <input
        type="text"
        placeholder="Buscar jugadores por nombre, club o nacionalidad..."
        value={localSearch}
        onChange={(e) => setLocalSearch(e.target.value)}
        className={cn(
          "w-full pl-10 pr-10 py-3 rounded-xl",
          "bg-navy-800 border border-navy-700",
          "text-white placeholder-gray-500",
          "focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20",
          "transition-all"
        )}
      />
      {localSearch && (
        <button
          onClick={() => setLocalSearch("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
