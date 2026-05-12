"use client";

import { motion } from "framer-motion";
import { cn, getRatingBg } from "@/lib/utils";

interface StatsBarsProps {
  stats: any;
}

interface StatGroup {
  title: string;
  color: string;
  stats: { label: string; value: number }[];
}

export function StatsBars({ stats }: StatsBarsProps) {
  const groups: StatGroup[] = [
    {
      title: "Ataque",
      color: "from-red-500 to-orange-500",
      stats: [
        { label: "Definición", value: stats.finishing },
        { label: "Potencia Tiro", value: stats.shotPower },
        { label: "Tiros Lejanos", value: stats.longShots },
        { label: "Posicionamiento", value: stats.positioning },
        { label: "Penales", value: stats.penalties },
      ],
    },
    {
      title: "Pase",
      color: "from-blue-500 to-cyan-500",
      stats: [
        { label: "Visión", value: stats.vision },
        { label: "Centros", value: stats.crossing },
        { label: "Pase Corto", value: stats.shortPassing },
        { label: "Pase Largo", value: stats.longPassing },
        { label: "Efecto", value: stats.curve },
        { label: "Tiros Libres", value: stats.freeKickAccuracy },
      ],
    },
    {
      title: "Defensa",
      color: "from-emerald-500 to-teal-500",
      stats: [
        { label: "Marcaje", value: stats.marking },
        { label: "Entrada Pie", value: stats.standingTackle },
        { label: "Entrada Desliz", value: stats.slidingTackle },
        { label: "Intercepciones", value: stats.interceptions },
        { label: "Cabeza", value: stats.heading },
      ],
    },
    {
      title: "Físico",
      color: "from-yellow-500 to-amber-500",
      stats: [
        { label: "Aceleración", value: stats.acceleration },
        { label: "Vel. Sprint", value: stats.sprintSpeed },
        { label: "Agilidad", value: stats.agility },
        { label: "Equilibrio", value: stats.balance },
        { label: "Salto", value: stats.jumping },
        { label: "Resistencia", value: stats.stamina },
        { label: "Fuerza", value: stats.strength },
        { label: "Agresividad", value: stats.aggression },
      ],
    },
    {
      title: "Técnica",
      color: "from-purple-500 to-pink-500",
      stats: [
        { label: "Regate", value: stats.dribbling },
        { label: "Control", value: stats.ballControl },
        { label: "Reacción", value: stats.reactions },
        { label: "Compostura", value: stats.composure },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      {groups.map((group, groupIndex) => (
        <motion.div
          key={group.title}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: groupIndex * 0.1 }}
          className="bg-navy-900/50 rounded-xl p-4 border border-navy-700/30"
        >
          <h4 className={cn("text-sm font-bold mb-3 bg-gradient-to-r bg-clip-text text-transparent", group.color)}>
            {group.title}
          </h4>
          <div className="space-y-2.5">
            {group.stats.map((stat, statIndex) => (
              <StatBar key={stat.label} label={stat.label} value={stat.value} color={group.color} delay={statIndex * 0.05} />
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function StatBar({ label, value, color, delay }: { label: string; value: number; color: string; delay: number }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay }} className="flex items-center gap-3">
      <span className="text-xs text-gray-400 w-24 shrink-0">{label}</span>
      <div className="flex-1 h-2 bg-navy-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.8, delay: delay + 0.2, ease: "easeOut" }}
          className={cn("h-full rounded-full bg-gradient-to-r", color)}
        />
      </div>
      <span className="text-xs font-bold text-white w-8 text-right">{value}</span>
    </motion.div>
  );
}
