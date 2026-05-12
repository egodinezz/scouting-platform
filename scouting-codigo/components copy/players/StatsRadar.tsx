"use client";

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";

interface StatsRadarProps {
  stats: any;
  position: string;
}

export function StatsRadar({ stats, position }: StatsRadarProps) {
  const isGoalkeeper = position === "GK";

  const data = isGoalkeeper ? [
    { subject: "Estirada", A: stats.diving || 50, fullMark: 100 },
    { subject: "Manejo", A: stats.handling || 50, fullMark: 100 },
    { subject: "Saques", A: stats.kicking || 50, fullMark: 100 },
    { subject: "Reflejos", A: stats.reflexes || 50, fullMark: 100 },
    { subject: "Velocidad", A: stats.speed || 50, fullMark: 100 },
    { subject: "Posición", A: stats.positioningGk || 50, fullMark: 100 },
  ] : [
    { subject: "Ritmo", A: stats.pace, fullMark: 100 },
    { subject: "Tiro", A: stats.finishing, fullMark: 100 },
    { subject: "Pase", A: stats.shortPassing, fullMark: 100 },
    { subject: "Regate", A: stats.dribbling, fullMark: 100 },
    { subject: "Defensa", A: stats.standingTackle, fullMark: 100 },
    { subject: "Físico", A: stats.strength, fullMark: 100 },
  ];

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke="hsl(var(--navy-600))" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: "hsl(var(--gray-400))", fontSize: 12 }} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
          <Radar name="Jugador" dataKey="A" stroke="hsl(var(--accent))" strokeWidth={2} fill="hsl(var(--accent))" fillOpacity={0.25} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
