"use client";

import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, Users, Target, Award } from "lucide-react";

const positionData = [
  { name: "Porteros", value: 45, color: "#3B82F6" },
  { name: "Defensas", value: 312, color: "#10B981" },
  { name: "Mediocampistas", value: 428, color: "#F59E0B" },
  { name: "Delanteros", value: 289, color: "#EF4444" },
  { name: "Extremos", value: 173, color: "#8B5CF6" },
];

const ageDistribution = [
  { range: "15-18", count: 89 },
  { range: "19-21", count: 234 },
  { range: "22-25", count: 456 },
  { range: "26-29", count: 312 },
  { range: "30-33", count: 128 },
  { range: "34+", count: 28 },
];

const topClubs = [
  { club: "Real Madrid", players: 28, avgRating: 84.2 },
  { club: "Barcelona", players: 26, avgRating: 83.8 },
  { club: "Man City", players: 24, avgRating: 85.1 },
  { club: "Bayern Munich", players: 22, avgRating: 84.5 },
  { club: "Liverpool", players: 21, avgRating: 83.2 },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Analytics</h1>
        <p className="text-gray-500 mt-1">Métricas y estadísticas de tu base de datos</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Jugadores Totales", value: "1,247", icon: Users, color: "blue" },
          { label: "Rating Promedio", value: "72.4", icon: Award, color: "emerald" },
          { label: "Edad Promedio", value: "24.3", icon: TrendingUp, color: "yellow" },
          { label: "Valor Mercado Total", value: "€4.2B", icon: Target, color: "purple" },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-panel p-6"
          >
            <div className={cn("p-2 rounded-lg w-fit mb-4", `bg-${stat.color}-500/10`)}>
              <stat.icon className={cn("w-5 h-5", `text-${stat.color}-400`)} />
            </div>
            <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
            <div className="text-sm text-gray-500">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-panel p-6"
        >
          <h3 className="text-lg font-bold text-white mb-6">Distribución por Posición</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={positionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {positionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: "hsl(var(--navy-900))", border: "1px solid hsl(var(--navy-700))", borderRadius: "12px" }}
                  itemStyle={{ color: "white" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            {positionData.map((pos) => (
              <div key={pos.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: pos.color }} />
                <span className="text-sm text-gray-400">{pos.name} ({pos.value})</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-panel p-6"
        >
          <h3 className="text-lg font-bold text-white mb-6">Distribución por Edad</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ageDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--navy-700))" vertical={false} />
                <XAxis dataKey="range" tick={{ fill: "hsl(var(--gray-400))", fontSize: 12 }} />
                <YAxis tick={{ fill: "hsl(var(--gray-500))", fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: "hsl(var(--navy-900))", border: "1px solid hsl(var(--navy-700))", borderRadius: "12px" }}
                  itemStyle={{ color: "white" }}
                />
                <Bar dataKey="count" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Top Clubs Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel overflow-hidden"
      >
        <h3 className="text-lg font-bold text-white p-6 pb-4">Top Clubs por Rating Promedio</h3>
        <table className="w-full">
          <thead className="bg-navy-800/50">
            <tr>
              <th className="text-left text-xs font-bold text-gray-400 uppercase px-6 py-3">Club</th>
              <th className="text-center text-xs font-bold text-gray-400 uppercase px-6 py-3">Jugadores</th>
              <th className="text-center text-xs font-bold text-gray-400 uppercase px-6 py-3">Rating Promedio</th>
              <th className="text-right text-xs font-bold text-gray-400 uppercase px-6 py-3">Tendencia</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-navy-800/50">
            {topClubs.map((club, index) => (
              <tr key={club.club} className="hover:bg-navy-800/30 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <span className="text-sm font-medium text-white">{club.club}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-center text-sm text-gray-400">{club.players}</td>
                <td className="px-6 py-4 text-center">
                  <span className="text-sm font-bold text-blue-400">{club.avgRating}</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-1 text-emerald-400">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm font-medium">+2.4%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}

function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(" ");
}
