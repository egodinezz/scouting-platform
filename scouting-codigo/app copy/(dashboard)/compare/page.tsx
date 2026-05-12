"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { cn, getRatingBg, getPositionLabel } from "@/lib/utils";
import { CheckCircle, AlertTriangle } from "lucide-react";

const mockPlayers = [
  {
    id: "1",
    fullName: "Jude Bellingham",
    currentClub: "Real Madrid",
    primaryPosition: "CM",
    secondaryPositions: ["AM", "DM"],
    age: 22,
    nationality: "Inglaterra",
    marketValue: 180000000,
    stats: {
      overallRating: 88,
      pace: 83, shooting: 78, passing: 88, dribbling: 88, defending: 78, physical: 84,
    },
  },
  {
    id: "2",
    fullName: "Pedri González",
    currentClub: "Barcelona",
    primaryPosition: "CM",
    secondaryPositions: ["AM"],
    age: 23,
    nationality: "España",
    marketValue: 120000000,
    stats: {
      overallRating: 85,
      pace: 83, shooting: 72, passing: 92, dribbling: 90, defending: 72, physical: 68,
    },
  },
  {
    id: "3",
    fullName: "Jamal Musiala",
    currentClub: "Bayern Munich",
    primaryPosition: "AM",
    secondaryPositions: ["LW", "CM"],
    age: 23,
    nationality: "Alemania",
    marketValue: 140000000,
    stats: {
      overallRating: 86,
      pace: 87, shooting: 80, passing: 88, dribbling: 92, defending: 65, physical: 72,
    },
  },
  {
    id: "4",
    fullName: "Florian Wirtz",
    currentClub: "Bayer Leverkusen",
    primaryPosition: "AM",
    secondaryPositions: ["LW", "SS"],
    age: 22,
    nationality: "Alemania",
    marketValue: 130000000,
    stats: {
      overallRating: 85,
      pace: 85, shooting: 78, passing: 90, dribbling: 90, defending: 62, physical: 70,
    },
  },
  {
    id: "5",
    fullName: "Eduardo Camavinga",
    currentClub: "Real Madrid",
    primaryPosition: "DM",
    secondaryPositions: ["CM", "LB"],
    age: 23,
    nationality: "Francia",
    marketValue: 90000000,
    stats: {
      overallRating: 82,
      pace: 83, shooting: 62, passing: 84, dribbling: 82, defending: 82, physical: 80,
    },
  },
  {
    id: "6",
    fullName: "Gavi",
    currentClub: "Barcelona",
    primaryPosition: "CM",
    secondaryPositions: ["DM", "LW"],
    age: 21,
    nationality: "España",
    marketValue: 90000000,
    stats: {
      overallRating: 80,
      pace: 85, shooting: 65, passing: 86, dribbling: 86, defending: 78, physical: 76,
    },
  },
];

const attributes = [
  { key: "pace", label: "Ritmo" },
  { key: "shooting", label: "Tiro" },
  { key: "passing", label: "Pase" },
  { key: "dribbling", label: "Regate" },
  { key: "defending", label: "Defensa" },
  { key: "physical", label: "Físico" },
];

function getComparisonType(pos1: string, pos2: string) {
  // Comparación PERFECTA: exactamente la misma posición
  if (pos1 === pos2) {
    return { 
      type: "perfect", 
      message: "Comparación perfecta - Misma posición exacta", 
      color: "text-emerald-400", 
      bg: "bg-emerald-500/10", 
      border: "border-emerald-500/30", 
      icon: CheckCircle 
    };
  }
  
  // Mediocentros: CM, AM, DM
  const mediocentros = ["CM", "AM", "DM"];
  
  // Si ambos son mediocentros
  if (mediocentros.includes(pos1) && mediocentros.includes(pos2)) {
    // AM vs DM = ilógica (opuestos)
    if ((pos1 === "AM" && pos2 === "DM") || (pos1 === "DM" && pos2 === "AM")) {
      return { 
        type: "illogical", 
        message: "Comparación ilógica - Roles opuestos en mediocampo", 
        color: "text-red-400", 
        bg: "bg-red-500/10", 
        border: "border-red-500/30", 
        icon: AlertTriangle 
      };
    }
    // CM vs AM o CM vs DM = neutral
    if (pos1 === "CM" || pos2 === "CM") {
      return { 
        type: "neutral", 
        message: "Comparación neutral - Perfiles diferentes en mediocampo", 
        color: "text-yellow-400", 
        bg: "bg-yellow-500/10", 
        border: "border-yellow-500/30", 
        icon: AlertTriangle 
      };
    }
  }
  
  // Delanteros: ST, SS, LW, RW
  const delanteros = ["ST", "SS", "LW", "RW"];
  // Mediocentros ofensivos: AM
  const ofensivos = ["AM", "SS", "LW", "RW"];
  // Mediocentros defensivos: DM
  const defensivos = ["DM", "CB", "LB", "RB"];
  
  // Ofensivo vs Defensivo = ilógica
  if ((ofensivos.includes(pos1) && defensivos.includes(pos2)) || 
      (defensivos.includes(pos1) && ofensivos.includes(pos2))) {
    return { 
      type: "illogical", 
      message: "Comparación ilógica - Ofensivo vs Defensivo", 
      color: "text-red-400", 
      bg: "bg-red-500/10", 
      border: "border-red-500/30", 
      icon: AlertTriangle 
    };
  }
  
  // Misma línea (ataque o defensa) pero diferente posición = lógica
  const lineaAtaque = ["ST", "SS", "LW", "RW", "AM"];
  const lineaDefensa = ["CB", "LB", "RB", "DM"];
  
  if ((lineaAtaque.includes(pos1) && lineaAtaque.includes(pos2)) ||
      (lineaDefensa.includes(pos1) && lineaDefensa.includes(pos2))) {
    return { 
      type: "logical", 
      message: "Comparación lógica - Misma línea, posiciones diferentes", 
      color: "text-blue-400", 
      bg: "bg-blue-500/10", 
      border: "border-blue-500/30", 
      icon: CheckCircle 
    };
  }
  
  // Portero vs cualquiera = ilógica
  if (pos1 === "GK" || pos2 === "GK") {
    return { 
      type: "illogical", 
      message: "Comparación ilógica - Portero vs campo", 
      color: "text-red-400", 
      bg: "bg-red-500/10", 
      border: "border-red-500/30", 
      icon: AlertTriangle 
    };
  }
  
  // Todo lo demás = neutral
  return { 
    type: "neutral", 
    message: "Comparación neutral - Posiciones diferentes", 
    color: "text-yellow-400", 
    bg: "bg-yellow-500/10", 
    border: "border-yellow-500/30", 
    icon: AlertTriangle 
  };
}


export default function ComparePage() {
  const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]);
  const [playerA, setPlayerA] = useState<any>(null);
  const [playerB, setPlayerB] = useState<any>(null);

  const togglePlayer = (id: string) => {
    if (selectedPlayers.includes(id)) {
      setSelectedPlayers(selectedPlayers.filter(p => p !== id));
      if (playerA?.id === id) setPlayerA(null);
      if (playerB?.id === id) setPlayerB(null);
    } else if (selectedPlayers.length < 2) {
      const newSelected = [...selectedPlayers, id];
      setSelectedPlayers(newSelected);
      const player = mockPlayers.find(p => p.id === id);
      if (!playerA) setPlayerA(player);
      else setPlayerB(player);
    }
  };

  const clearSelection = () => {
    setSelectedPlayers([]);
    setPlayerA(null);
    setPlayerB(null);
  };

  const comparisonInfo = playerA && playerB ? getComparisonType(
    playerA.primaryPosition, 
    playerB.primaryPosition
  ) : null;

  const radarData = playerA && playerB ? attributes.map((attr) => ({
    subject: attr.label,
    A: playerA.stats[attr.key as keyof typeof playerA.stats] || 0,
    B: playerB.stats[attr.key as keyof typeof playerB.stats] || 0,
  })) : [];

  const barData = playerA && playerB ? attributes.map((attr) => ({
    name: attr.label,
    [playerA.fullName.split(" ")[0]]: playerA.stats[attr.key as keyof typeof playerA.stats] || 0,
    [playerB.fullName.split(" ")[0]]: playerB.stats[attr.key as keyof typeof playerB.stats] || 0,
  })) : [];


  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Comparar Jugadores</h1>
          <p className="text-gray-500 mt-1">Selecciona 2 jugadores para comparar</p>
        </div>
        {selectedPlayers.length > 0 && (
          <button
            onClick={clearSelection}
            className="px-4 py-2 rounded-xl bg-navy-800 border border-navy-700 text-gray-400 hover:text-white transition-colors text-sm"
          >
            Limpiar selección
          </button>
        )}
      </div>

      <div className="glass-panel p-6">
        <h3 className="text-lg font-bold text-white mb-4">Selecciona 2 jugadores</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {mockPlayers.map((player) => {
            const isSelected = selectedPlayers.includes(player.id);
            const isDisabled = !isSelected && selectedPlayers.length >= 2;
            
            return (
              <motion.button
                key={player.id}
                whileHover={!isDisabled ? { scale: 1.05 } : {}}
                whileTap={!isDisabled ? { scale: 0.95 } : {}}
                onClick={() => !isDisabled && togglePlayer(player.id)}
                className={cn(
                  "relative p-4 rounded-xl border transition-all text-left",
                  isSelected
                    ? "bg-blue-500/20 border-blue-500/50 text-white"
                    : isDisabled
                    ? "bg-navy-800/30 border-navy-800 text-gray-600 cursor-not-allowed"
                    : "bg-navy-800 border-navy-700 text-gray-300 hover:border-blue-500/30 hover:text-white"
                )}
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-lg mb-2">
                  {player.fullName.split(" ").map(n => n[0]).join("")}
                </div>
                <div className="text-sm font-bold truncate">{player.fullName}</div>
                <div className="text-xs text-gray-500">{player.currentClub}</div>
                <div className="text-xs text-blue-400 mt-1">{getPositionLabel(player.primaryPosition)}</div>
                {isSelected && (
                  <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                    <CheckCircle className="w-3 h-3 text-white" />
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>


      {playerA && playerB && comparisonInfo && (
        <>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "glass-panel p-4 flex items-center gap-3 border",
              comparisonInfo.bg,
              comparisonInfo.border
            )}
          >
            <comparisonInfo.icon className={cn("w-6 h-6", comparisonInfo.color)} />
            <div>
              <div className={cn("font-bold", comparisonInfo.color)}>{comparisonInfo.message}</div>
              <div className="text-sm text-gray-400">
                {playerA.fullName} ({getPositionLabel(playerA.primaryPosition)}) vs {playerB.fullName} ({getPositionLabel(playerB.primaryPosition)})
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[playerA, playerB].map((player, index) => (
              <motion.div
                key={player.id}
                initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass-panel p-6"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-xl font-bold">
                    {player.fullName.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{player.fullName}</h3>
                    <p className="text-sm text-gray-400">{player.currentClub} • {getPositionLabel(player.primaryPosition)}</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-navy-800/50 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-white">{player.age}</div>
                    <div className="text-xs text-gray-500">Edad</div>
                  </div>
                  <div className="bg-navy-800/50 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-white">{player.nationality}</div>
                    <div className="text-xs text-gray-500">Nacionalidad</div>
                  </div>
                  <div className="bg-navy-800/50 rounded-lg p-3 text-center">
                    <div className={cn("text-lg font-bold", getRatingBg(player.stats.overallRating).replace("bg-", "text-"))}>
                      {player.stats.overallRating}
                    </div>
                    <div className="text-xs text-gray-500">Rating</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-panel p-6"
            >
              <h3 className="text-lg font-bold text-white mb-4 text-center">Radar Comparativo</h3>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                    <PolarGrid stroke="hsl(var(--navy-600))" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: "hsl(var(--gray-400))", fontSize: 12 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar name={playerA.fullName} dataKey="A" stroke="#3B82F6" strokeWidth={2} fill="#3B82F6" fillOpacity={0.2} />
                    <Radar name={playerB.fullName} dataKey="B" stroke="#10B981" strokeWidth={2} fill="#10B981" fillOpacity={0.2} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500" />
                  <span className="text-sm text-gray-400">{playerA.fullName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="text-sm text-gray-400">{playerB.fullName}</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-panel p-6"
            >
              <h3 className="text-lg font-bold text-white mb-4 text-center">Comparación de Atributos</h3>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData} layout="vertical" margin={{ left: 40 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--navy-700))" horizontal={false} />
                    <XAxis type="number" domain={[0, 100]} tick={{ fill: "hsl(var(--gray-500))", fontSize: 12 }} />
                    <YAxis dataKey="name" type="category" tick={{ fill: "hsl(var(--gray-400))", fontSize: 12 }} width={60} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: "hsl(var(--navy-900))", border: "1px solid hsl(var(--navy-700))", borderRadius: "12px" }}
                      itemStyle={{ color: "white" }}
                    />
                    <Bar dataKey={playerA.fullName.split(" ")[0]} fill="#3B82F6" radius={[0, 4, 4, 0]} />
                    <Bar dataKey={playerB.fullName.split(" ")[0]} fill="#10B981" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-panel overflow-hidden"
          >
            <table className="w-full">
              <thead className="bg-navy-800/50">
                <tr>
                  <th className="text-left text-xs font-bold text-gray-400 uppercase px-4 py-3">Atributo</th>
                  <th className="text-center text-xs font-bold text-gray-400 uppercase px-4 py-3">{playerA.fullName}</th>
                  <th className="text-center text-xs font-bold text-gray-400 uppercase px-4 py-3">{playerB.fullName}</th>
                  <th className="text-center text-xs font-bold text-gray-400 uppercase px-4 py-3">Diferencia</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-800/50">
                {attributes.map((attr) => {
                  const valA = playerA.stats[attr.key as keyof typeof playerA.stats] || 0;
                  const valB = playerB.stats[attr.key as keyof typeof playerB.stats] || 0;
                  const diff = valA - valB;
                  return (
                    <tr key={attr.key} className="hover:bg-navy-800/30 transition-colors">
                      <td className="px-4 py-3 text-sm text-white font-medium">{attr.label}</td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <span className="text-sm font-bold text-blue-400">{valA}</span>
                          <div className="w-20 h-1.5 bg-navy-800 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 rounded-full" style={{ width: `${valA}%` }} />
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <span className="text-sm font-bold text-emerald-400">{valB}</span>
                          <div className="w-20 h-1.5 bg-navy-800 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${valB}%` }} />
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={cn(
                          "text-sm font-bold",
                          diff > 0 ? "text-blue-400" : diff < 0 ? "text-emerald-400" : "text-gray-500"
                        )}>
                          {diff > 0 ? `+${diff}` : diff}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </motion.div>
        </>
      )}
    </div>
  );
}
