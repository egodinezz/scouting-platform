import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateAge(birthDate: Date): number {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

export function formatMarketValue(value: number | null): string {
  if (!value) return "N/A";
  if (value >= 1000000) {
    return `€${(value / 1000000).toFixed(1)}M`;
  }
  return `€${(value / 1000).toFixed(0)}K`;
}

export function getRatingColor(rating: number): string {
  if (rating >= 85) return "text-emerald-400";
  if (rating >= 75) return "text-blue-400";
  if (rating >= 65) return "text-yellow-400";
  if (rating >= 50) return "text-orange-400";
  return "text-red-400";
}

export function getRatingBg(rating: number): string {
  if (rating >= 85) return "bg-emerald-500";
  if (rating >= 75) return "bg-blue-500";
  if (rating >= 65) return "bg-yellow-500";
  if (rating >= 50) return "bg-orange-500";
  return "bg-red-500";
}

export function getPositionLabel(position: string): string {
  const labels: Record<string, string> = {
    GK: "Portero",
    CB: "Central",
    LB: "Lateral Izq",
    RB: "Lateral Der",
    DM: "Medio Defensivo",
    CM: "Medio Centro",
    AM: "Medio Ofensivo",
    LW: "Extremo Izq",
    RW: "Extremo Der",
    SS: "Segunda Punta",
    ST: "Delantero Centro",
  };
  return labels[position] || position;
}
