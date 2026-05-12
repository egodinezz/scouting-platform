"use client";

import { motion } from "framer-motion";
import { FileText, Search, Filter, Star, Calendar, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const mockReports = [
  {
    id: "1",
    playerName: "Jude Bellingham",
    playerClub: "Real Madrid",
    overallScore: 88,
    potential: 95,
    scoutName: "John Doe",
    createdAt: "2026-03-15",
    status: "completed",
  },
  {
    id: "2",
    playerName: "Pedri González",
    playerClub: "Barcelona",
    overallScore: 85,
    potential: 92,
    scoutName: "John Doe",
    createdAt: "2026-03-10",
    status: "completed",
  },
  {
    id: "3",
    playerName: "Jamal Musiala",
    playerClub: "Bayern Munich",
    overallScore: 86,
    potential: 94,
    scoutName: "John Doe",
    createdAt: "2026-02-28",
    status: "completed",
  },
];

export default function ReportsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredReports = mockReports.filter(
    (r) =>
      r.playerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.playerClub.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Reportes de Scouting</h1>
          <p className="text-gray-500 mt-1">{filteredReports.length} reportes guardados</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-xl text-white text-sm font-medium transition-colors">
          <FileText className="w-4 h-4" />
          Nuevo Reporte
        </button>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Buscar reportes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-navy-800 border border-navy-700 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-navy-800 border border-navy-700 text-gray-400 hover:text-white transition-colors">
          <Filter className="w-4 h-4" />
          <span className="text-sm">Filtrar</span>
        </button>
      </div>

      <div className="grid gap-4">
        {filteredReports.map((report, index) => (
          <motion.div
            key={report.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="glass-panel p-6 hover:border-blue-500/30 transition-colors cursor-pointer"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-lg">
                  {report.playerName.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">{report.playerName}</h3>
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <span className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-blue-400" />
                      {report.playerClub}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {report.createdAt}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5" />
                      {report.scoutName}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className={cn(
                  "text-2xl font-bold",
                  report.overallScore >= 85 ? "text-emerald-400" : "text-blue-400"
                )}>
                  {report.overallScore}
                </div>
                <div className="text-xs text-gray-500">Score General</div>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">Potencial:</span>
                <div className="w-24 h-1.5 bg-navy-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" style={{ width: `${report.potential}%` }} />
                </div>
                <span className="text-xs font-bold text-blue-400">{report.potential}</span>
              </div>
              <span className={cn(
                "px-2 py-0.5 rounded-full text-xs font-medium",
                report.status === "completed" ? "bg-emerald-500/20 text-emerald-400" : "bg-yellow-500/20 text-yellow-400"
              )}>
                {report.status === "completed" ? "Completado" : "Borrador"}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
