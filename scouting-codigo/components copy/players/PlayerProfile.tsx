"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { useFavoritesStore } from "@/stores/favoritesStore";
import { useRouter } from "next/navigation";
import { StatsRadar } from "./StatsRadar";
import { StatsBars } from "./StatsBars";
import { cn, formatMarketValue, getRatingColor, getPositionLabel } from "@/lib/utils";
import { 
  ArrowLeft, Flag, Calendar, Ruler, Weight, Footprints, 
  Shield, TrendingUp, Star, Edit3, Save, User, Heart,
  Share2, Download
} from "lucide-react";

interface PlayerProfileProps {
  player: any;
}

export function PlayerProfile({ player }: PlayerProfileProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"overview" | "stats" | "performance" | "reports">("overview");
  const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore();
const favorite = isFavorite(player.id);

  const tabs = [
    { id: "overview" as const, label: "General", icon: User },
    { id: "stats" as const, label: "Estadísticas", icon: Star },
    { id: "performance" as const, label: "Rendimiento", icon: TrendingUp },
    { id: "reports" as const, label: "Reportes", icon: Edit3 },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header del perfil */}
      <div className="relative h-72 bg-gradient-to-br from-navy-800 via-navy-900 to-gray-950 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

        <div className="relative max-w-7xl mx-auto px-6 h-full flex items-end pb-8">
          <button
            onClick={() => router.back()}
            className="absolute top-6 left-6 flex items-center gap-2 text-gray-400 hover:text-white transition-colors bg-navy-800/50 backdrop-blur-sm px-3 py-2 rounded-xl"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm">Volver</span>
          </button>

          <div className="flex items-end gap-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative w-36 h-36 rounded-2xl overflow-hidden border-4 border-navy-800 shadow-2xl"
            >
              {player.photoUrl ? (
                <Image src={player.photoUrl} alt={player.fullName} fill className="object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center">
                  <span className="text-5xl font-bold text-white">
                    {player.firstName[0]}{player.lastName[0]}
                  </span>
                </div>
              )}
            </motion.div>

            <div className="mb-2">
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-4xl font-bold text-white mb-2"
              >
                {player.fullName}
              </motion.h1>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-blue-400" />
                  {player.currentClub}
                </span>
                <span className="flex items-center gap-1.5">
                  <Flag className="w-4 h-4" />
                  {player.nationality}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {player.age} años
                </span>
                <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold">
                  {getPositionLabel(player.primaryPosition)}
                </span>
              </div>
            </div>
          </div>

          <div className="absolute right-6 bottom-8 flex items-center gap-3">
           <motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  onClick={() => {
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
  }}
  className={cn(
    "p-3 rounded-xl border transition-all",
    favorite 
      ? "bg-red-500/20 border-red-500/30 text-red-400" 
      : "bg-navy-800 border-navy-700 text-gray-400 hover:text-white"
  )}
>
  <Heart className={cn("w-5 h-5", favorite && "fill-current")} />
</motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 rounded-xl bg-navy-800 border border-navy-700 text-gray-400 hover:text-white transition-all"
            >
              <Share2 className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 rounded-xl bg-navy-800 border border-navy-700 text-gray-400 hover:text-white transition-all"
            >
              <Download className="w-5 h-5" />
            </motion.button>
          </div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="absolute right-6 top-8"
          >
            <div className="text-center bg-navy-900/80 backdrop-blur-sm rounded-2xl p-4 border border-navy-700">
              <div className={cn(
                "text-5xl font-black",
                player.stats?.overallRating && player.stats.overallRating >= 80 ? "text-emerald-400" :
                player.stats?.overallRating && player.stats.overallRating >= 70 ? "text-blue-400" :
                "text-yellow-400"
              )}>
                {player.stats?.overallRating || "-"}
              </div>
              <div className="text-xs text-gray-500 mt-1 uppercase tracking-wider">Rating</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Tabs */}
      <div className="sticky top-0 z-40 bg-navy-900/80 backdrop-blur-xl border-b border-navy-700/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-all",
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-400"
                    : "border-transparent text-gray-500 hover:text-gray-300"
                )}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === "overview" && <OverviewTab player={player} />}
        {activeTab === "stats" && player.stats && <StatsTab stats={player.stats} position={player.primaryPosition} />}
        {activeTab === "performance" && <PerformanceTab performances={player.performances || []} />}
        {activeTab === "reports" && <ReportsTab reports={player.reports || []} playerId={player.id} />}
      </div>
    </div>
  );
}

function OverviewTab({ player }: { player: any }) {
  const infoItems = [
    { icon: Calendar, label: "Nacimiento", value: new Date(player.dateOfBirth).toLocaleDateString("es-ES") },
    { icon: Ruler, label: "Altura", value: player.height ? `${player.height} cm` : "N/A" },
    { icon: Weight, label: "Peso", value: player.weight ? `${player.weight} kg` : "N/A" },
    { icon: Footprints, label: "Pierna", value: player.preferredFoot === "LEFT" ? "Izquierda" : player.preferredFoot === "RIGHT" ? "Derecha" : "Ambas" },
    { icon: Shield, label: "Club", value: player.currentClub },
    { icon: TrendingUp, label: "Valor Mercado", value: formatMarketValue(player.marketValue) },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <div className="glass-panel p-6">
          <h3 className="text-lg font-bold text-white mb-4">Información General</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {infoItems.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-navy-800/50 rounded-xl p-4 border border-navy-700/30 hover:border-blue-500/20 transition-colors"
              >
                <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
                  <item.icon className="w-3.5 h-3.5" />
                  {item.label}
                </div>
                <div className="text-white font-semibold">{item.value}</div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="glass-panel p-6">
          <h3 className="text-lg font-bold text-white mb-4">Posiciones</h3>
          <div className="flex flex-wrap gap-2">
            <span className="px-4 py-2 rounded-full bg-blue-500/20 text-blue-400 font-bold text-sm border border-blue-500/30">
              {getPositionLabel(player.primaryPosition)} (Principal)
            </span>
            {player.secondaryPositions?.map((pos: string) => (
              <span key={pos} className="px-4 py-2 rounded-full bg-navy-800 text-gray-400 text-sm border border-navy-700">
                {getPositionLabel(pos)}
              </span>
            ))}
          </div>
        </div>

        {player.contractUntil && (
          <div className="glass-panel p-6">
            <h3 className="text-lg font-bold text-white mb-2">Contrato</h3>
            <p className="text-gray-400 text-sm">
              Vence el {new Date(player.contractUntil).toLocaleDateString("es-ES")}
            </p>
          </div>
        )}
      </div>

      <div className="glass-panel p-6">
        <h3 className="text-lg font-bold text-white mb-4 text-center">Vista Rápida de Atributos</h3>
        {player.stats && <StatsRadar stats={player.stats} position={player.primaryPosition} />}
      </div>
    </motion.div>
  );
}

function StatsTab({ stats, position }: { stats: any; position: string }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1">
        <div className="glass-panel p-6 sticky top-24">
          <h3 className="text-lg font-bold text-white mb-4 text-center">Perfil de Atributos</h3>
          <StatsRadar stats={stats} position={position} />
          <div className="mt-4 text-center">
            <div className="text-3xl font-black text-blue-400">{stats.overallRating}</div>
            <div className="text-xs text-gray-500 uppercase tracking-wider">Rating General</div>
          </div>
        </div>
      </div>
      <div className="lg:col-span-2">
        <StatsBars stats={stats} />
      </div>
    </motion.div>
  );
}

function PerformanceTab({ performances }: { performances: any[] }) {
  if (performances.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4">📊</div>
        <h3 className="text-xl font-bold text-white mb-2">Sin datos de rendimiento</h3>
        <p className="text-gray-500">No hay registros de rendimiento para este jugador</p>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-panel overflow-hidden">
      <table className="w-full">
        <thead className="bg-navy-800/50">
          <tr>
            <th className="text-left text-xs font-bold text-gray-400 uppercase px-4 py-3">Temporada</th>
            <th className="text-left text-xs font-bold text-gray-400 uppercase px-4 py-3">Competición</th>
            <th className="text-center text-xs font-bold text-gray-400 uppercase px-4 py-3">PJ</th>
            <th className="text-center text-xs font-bold text-gray-400 uppercase px-4 py-3">Min</th>
            <th className="text-center text-xs font-bold text-gray-400 uppercase px-4 py-3">Goles</th>
            <th className="text-center text-xs font-bold text-gray-400 uppercase px-4 py-3">Asist.</th>
            <th className="text-center text-xs font-bold text-gray-400 uppercase px-4 py-3">xG</th>
            <th className="text-center text-xs font-bold text-gray-400 uppercase px-4 py-3">xA</th>
            <th className="text-center text-xs font-bold text-gray-400 uppercase px-4 py-3">Rating</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-navy-800/50">
          {performances.map((perf, index) => (
            <motion.tr
              key={perf.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="hover:bg-navy-800/30 transition-colors"
            >
              <td className="px-4 py-3 text-sm text-white font-medium">{perf.season}</td>
              <td className="px-4 py-3 text-sm text-gray-400">{perf.competition}</td>
              <td className="px-4 py-3 text-sm text-center text-white font-bold">{perf.matchesPlayed}</td>
              <td className="px-4 py-3 text-sm text-center text-gray-400">{perf.minutesPlayed}</td>
              <td className="px-4 py-3 text-sm text-center text-emerald-400 font-bold">{perf.goals}</td>
              <td className="px-4 py-3 text-sm text-center text-blue-400 font-bold">{perf.assists}</td>
              <td className="px-4 py-3 text-sm text-center text-gray-400">{perf.xG?.toFixed(2)}</td>
              <td className="px-4 py-3 text-sm text-center text-gray-400">{perf.xA?.toFixed(2)}</td>
              <td className="px-4 py-3 text-center">
                <span className={cn(
                  "text-sm font-bold",
                  perf.avgRating && perf.avgRating >= 7.5 ? "text-emerald-400" :
                  perf.avgRating && perf.avgRating >= 6.5 ? "text-blue-400" :
                  "text-yellow-400"
                )}>
                  {perf.avgRating?.toFixed(1) || "-"}
                </span>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
}

function ReportsTab({ reports, playerId }: { reports: any[]; playerId: string }) {
  const [isCreating, setIsCreating] = useState(false);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-white">Reportes de Scouting</h3>
        <button
          onClick={() => setIsCreating(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white text-sm font-medium transition-colors"
        >
          <Edit3 className="w-4 h-4" />
          Nuevo Reporte
        </button>
      </div>

      {isCreating && <ReportForm playerId={playerId} onCancel={() => setIsCreating(false)} />}

      <div className="grid gap-4">
        {reports.length === 0 ? (
          <div className="text-center py-12 glass-panel">
            <div className="text-4xl mb-3">📝</div>
            <h4 className="text-white font-semibold mb-1">Sin reportes aún</h4>
            <p className="text-gray-500 text-sm">Crea tu primer reporte de scouting para este jugador</p>
          </div>
        ) : (
          reports.map((report, index) => (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-panel p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="text-sm text-gray-500 mb-1">
                    {new Date(report.createdAt).toLocaleDateString("es-ES")}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-white">Score: {report.overallScore}/100</span>
                    <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 text-xs">
                      Potencial: {report.potential}/100
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4">
                  <h4 className="text-emerald-400 font-bold text-sm mb-2">Fortalezas</h4>
                  <p className="text-gray-300 text-sm whitespace-pre-wrap">{report.strengths}</p>
                </div>
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                  <h4 className="text-red-400 font-bold text-sm mb-2">Debilidades</h4>
                  <p className="text-gray-300 text-sm whitespace-pre-wrap">{report.weaknesses}</p>
                </div>
              </div>

              {report.playStyle && (
                <div className="mt-4">
                  <h4 className="text-blue-400 font-bold text-sm mb-1">Estilo de Juego</h4>
                  <p className="text-gray-300 text-sm">{report.playStyle}</p>
                </div>
              )}

              {report.comparison && (
                <div className="mt-4">
                  <h4 className="text-purple-400 font-bold text-sm mb-1">Comparación</h4>
                  <p className="text-gray-300 text-sm">{report.comparison}</p>
                </div>
              )}

              {report.observations && (
                <div className="mt-4 bg-navy-800/50 rounded-lg p-4">
                  <h4 className="text-gray-400 font-bold text-sm mb-1">Observaciones</h4>
                  <p className="text-gray-300 text-sm whitespace-pre-wrap">{report.observations}</p>
                </div>
              )}
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
}

function ReportForm({ playerId, onCancel }: { playerId: string; onCancel: () => void }) {
  const [formData, setFormData] = useState({
    strengths: "",
    weaknesses: "",
    potential: 50,
    playStyle: "",
    comparison: "",
    observations: "",
    overallScore: 50,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Guardando reporte...", formData);
    onCancel();
  };

  return (
    <motion.form
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      onSubmit={handleSubmit}
      className="glass-panel p-6 space-y-4"
    >
      <h4 className="text-white font-bold mb-4">Nuevo Reporte de Scouting</h4>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-400 mb-1">Fortalezas</label>
          <textarea
            value={formData.strengths}
            onChange={(e) => setFormData({ ...formData, strengths: e.target.value })}
            className="w-full bg-navy-800 border border-navy-700 rounded-lg p-3 text-white text-sm focus:border-blue-500 focus:outline-none resize-none h-24"
            placeholder="Describe las fortalezas del jugador..."
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">Debilidades</label>
          <textarea
            value={formData.weaknesses}
            onChange={(e) => setFormData({ ...formData, weaknesses: e.target.value })}
            className="w-full bg-navy-800 border border-navy-700 rounded-lg p-3 text-white text-sm focus:border-blue-500 focus:outline-none resize-none h-24"
            placeholder="Describe las debilidades..."
          />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm text-gray-400 mb-1">Score General ({formData.overallScore})</label>
          <input
            type="range" min="0" max="100"
            value={formData.overallScore}
            onChange={(e) => setFormData({ ...formData, overallScore: parseInt(e.target.value) })}
            className="w-full accent-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">Potencial ({formData.potential})</label>
          <input
            type="range" min="0" max="100"
            value={formData.potential}
            onChange={(e) => setFormData({ ...formData, potential: parseInt(e.target.value) })}
            className="w-full accent-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm text-gray-400 mb-1">Estilo de Juego</label>
        <input
          type="text"
          value={formData.playStyle}
          onChange={(e) => setFormData({ ...formData, playStyle: e.target.value })}
          className="w-full bg-navy-800 border border-navy-700 rounded-lg p-3 text-white text-sm focus:border-blue-500 focus:outline-none"
          placeholder="Ej: Mediocentro box-to-box con gran capacidad de recuperación"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-400 mb-1">Comparación</label>
        <input
          type="text"
          value={formData.comparison}
          onChange={(e) => setFormData({ ...formData, comparison: e.target.value })}
          className="w-full bg-navy-800 border border-navy-700 rounded-lg p-3 text-white text-sm focus:border-blue-500 focus:outline-none"
          placeholder="Ej: Similar a Frenkie de Jong pero con más llegada"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-400 mb-1">Observaciones</label>
        <textarea
          value={formData.observations}
          onChange={(e) => setFormData({ ...formData, observations: e.target.value })}
          className="w-full bg-navy-800 border border-navy-700 rounded-lg p-3 text-white text-sm focus:border-blue-500 focus:outline-none resize-none h-24"
          placeholder="Observaciones adicionales..."
        />
      </div>

      <div className="flex gap-3 justify-end">
        <button type="button" onClick={onCancel} className="px-4 py-2 text-gray-400 hover:text-white text-sm transition-colors">
          Cancelar
        </button>
        <button type="submit" className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white text-sm font-medium transition-colors">
          <Save className="w-4 h-4" />
          Guardar Reporte
        </button>
      </div>
    </motion.form>
  );
}
