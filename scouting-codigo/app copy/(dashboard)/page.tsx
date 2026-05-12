"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { TrendingUp, Users, FileText, Star, ArrowUpRight, ArrowDownRight, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const stats = [
  { label: "Total Jugadores", value: "1,247", change: "+12", trend: "up", icon: Users },
  { label: "Reportes Activos", value: "89", change: "+5", trend: "up", icon: FileText },
  { label: "Favoritos", value: "34", change: "-2", trend: "down", icon: Star },
  { label: "Valor Total", value: "€2.4B", change: "+8.5%", trend: "up", icon: TrendingUp },
];

const recentPlayers = [
  { name: "Jude Bellingham", club: "Real Madrid", rating: 88, trend: "up" },
  { name: "Pedri", club: "Barcelona", rating: 85, trend: "up" },
  { name: "Eduardo Camavinga", club: "Real Madrid", rating: 82, trend: "stable" },
  { name: "Gavi", club: "Barcelona", rating: 80, trend: "down" },
  { name: "Jamal Musiala", club: "Bayern Munich", rating: 86, trend: "up" },
];

export default function DashboardPage() {
  const router = useRouter();
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-500">Resumen de tu base de datos de scouting</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-panel p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <stat.icon className="w-5 h-5 text-blue-400" />
              </div>
              <div className={cn(
                "flex items-center gap-1 text-xs font-medium",
                stat.trend === "up" ? "text-emerald-400" : "text-red-400"
              )}>
                {stat.trend === "up" ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                {stat.change}
              </div>
            </div>
            <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
            <div className="text-sm text-gray-500">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity & Top Players */}
<div className="flex justify-end mb-4">
  <button
    onClick={() => router.push("/players/new")}
    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-xl text-white text-sm font-medium transition-colors"
  >
    <Plus className="w-4 h-4" />
    Agregar Jugador
  </button>
</div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-panel p-6"
        >
          <h3 className="text-lg font-bold text-white mb-4">Jugadores Destacados</h3>
          <div className="space-y-3">
            {recentPlayers.map((player, index) => (
              <div
                key={player.name}
                className="flex items-center justify-between p-3 rounded-xl bg-navy-800/50 border border-navy-700/30 hover:border-blue-500/20 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm">
                    {player.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">{player.name}</div>
                    <div className="text-xs text-gray-500">{player.club}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={cn(
                    "text-sm font-bold",
                    player.rating >= 85 ? "text-emerald-400" : "text-blue-400"
                  )}>
                    {player.rating}
                  </span>
                  <div className={cn(
                    "w-2 h-2 rounded-full",
                    player.trend === "up" ? "bg-emerald-500" : player.trend === "down" ? "bg-red-500" : "bg-gray-500"
                  )} />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-panel p-6"
        >
          <h3 className="text-lg font-bold text-white mb-4">Actividad Reciente</h3>
          <div className="space-y-4">
            {[
              { action: "Nuevo reporte creado", target: "Jude Bellingham", time: "2 min ago", type: "report" },
              { action: "Jugador añadido a favoritos", target: "Pedri", time: "15 min ago", type: "favorite" },
              { action: "Estadísticas actualizadas", target: "Jamal Musiala", time: "1 hora ago", type: "update" },
              { action: "Comparación generada", target: "Bellingham vs Musiala", time: "3 horas ago", type: "compare" },
            ].map((activity, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className={cn(
                  "w-2 h-2 mt-2 rounded-full shrink-0",
                  activity.type === "report" ? "bg-blue-500" :
                  activity.type === "favorite" ? "bg-red-500" :
                  activity.type === "update" ? "bg-emerald-500" : "bg-purple-500"
                )} />
                <div>
                  <div className="text-sm text-white">{activity.action}</div>
                  <div className="text-xs text-blue-400">{activity.target}</div>
                  <div className="text-xs text-gray-600 mt-0.5">{activity.time}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
