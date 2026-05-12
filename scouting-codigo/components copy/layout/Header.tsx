"use client";

import { Bell, Search } from "lucide-react";
import { cn } from "@/lib/utils";

export function Header() {
  return (
    <header className="h-16 bg-navy-900/80 backdrop-blur-xl border-b border-navy-700/50 flex items-center justify-between px-6 sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-semibold text-white">Panel de Scouting</h2>
      </div>
      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-xl text-gray-400 hover:bg-navy-800 hover:text-white transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>
        <div className="w-px h-6 bg-navy-700" />
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
            <span className="text-white text-xs font-bold">JD</span>
          </div>
        </div>
      </div>
    </header>
  );
}
