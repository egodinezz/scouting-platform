"use client";

import { useState } from "react";
import { usePlayersStore } from "@/stores/playersStore";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  User, Calendar, Ruler, Weight, Footprints, Shield, 
  TrendingUp, Star, Save, ArrowLeft, Plus 
} from "lucide-react";

const positions = [
  "GK", "CB", "LB", "RB", "DM", "CM", "AM", "LW", "RW", "SS", "ST"
];

const positionLabels: Record<string, string> = {
  GK: "Portero", CB: "Central", LB: "Lateral Izq", RB: "Lateral Der",
  DM: "Medio Defensivo", CM: "Medio Centro", AM: "Medio Ofensivo",
  LW: "Extremo Izq", RW: "Extremo Der", SS: "Segunda Punta", ST: "Delantero Centro"
};

const feet = ["LEFT", "RIGHT", "BOTH"];

export default function NewPlayerPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    fullName: "",
    dateOfBirth: "",
    nationality: "",
    height: "",
    weight: "",
    preferredFoot: "RIGHT",
    primaryPosition: "CM",
    secondaryPositions: [] as string[],
    currentClub: "",
    marketValue: "",
    photoUrl: "",
  });

  const [stats, setStats] = useState({
    overallRating: 50,
    finishing: 50, shotPower: 50, longShots: 50, positioning: 50, penalties: 50,
    vision: 50, crossing: 50, shortPassing: 50, longPassing: 50, curve: 50, freeKickAccuracy: 50,
    marking: 50, standingTackle: 50, slidingTackle: 50, interceptions: 50, heading: 50,
    acceleration: 50, sprintSpeed: 50, agility: 50, balance: 50, jumping: 50, stamina: 50, strength: 50, aggression: 50,
    pace: 50,
    dribbling: 50, ballControl: 50, reactions: 50, composure: 50,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      fullName: name === "firstName" || name === "lastName" 
        ? `${name === "firstName" ? value : prev.firstName} ${name === "lastName" ? value : prev.lastName}`.trim()
        : prev.fullName
    }));
  };

  const handleStatChange = (key: string, value: number) => {
    setStats(prev => ({ ...prev, [key]: value }));
  };

  const toggleSecondaryPosition = (pos: string) => {
    setFormData(prev => ({
      ...prev,
      secondaryPositions: prev.secondaryPositions.includes(pos)
        ? prev.secondaryPositions.filter(p => p !== pos)
        : [...prev.secondaryPositions, pos]
    }));
  };

   const { addPlayer } = usePlayersStore();

  const handleSubmit = () => {
    const newPlayer = {
      id: Date.now().toString(),
      ...formData,
      age: formData.dateOfBirth ? Math.floor((new Date().getTime() - new Date(formData.dateOfBirth).getTime()) / (365.25 * 24 * 60 * 60 * 1000)) : 0,
      height: parseFloat(formData.height) || 0,
      weight: parseFloat(formData.weight) || 0,
      marketValue: parseFloat(formData.marketValue) || 0,
      stats: {
        ...stats,
        overallRating: Math.round(
          (stats.finishing + stats.shotPower + stats.longShots + stats.positioning + stats.penalties +
           stats.vision + stats.crossing + stats.shortPassing + stats.longPassing + stats.curve + stats.freeKickAccuracy +
           stats.marking + stats.standingTackle + stats.slidingTackle + stats.interceptions + stats.heading +
           stats.acceleration + stats.sprintSpeed + stats.agility + stats.balance + stats.jumping + stats.stamina + stats.strength + stats.aggression +
           stats.pace + stats.dribbling + stats.ballControl + stats.reactions + stats.composure) / 25
        ),
      },
    };
    
    addPlayer(newPlayer);
    alert("Jugador agregado correctamente");
    router.push("/players");
  };


  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="p-2 rounded-xl bg-navy-800 border border-navy-700 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-white">Agregar Nuevo Jugador</h1>
          <p className="text-gray-500 mt-1">Completa la información del futbolista</p>
        </div>
      </div>

      {/* Pasos */}
      <div className="flex gap-2">
        {[1, 2, 3].map((s) => (
          <button
            key={s}
            onClick={() => setStep(s)}
            className={cn(
              "flex-1 py-3 rounded-xl text-sm font-medium transition-all border",
              step === s
                ? "bg-blue-500/20 border-blue-500/50 text-blue-400"
                : "bg-navy-800 border-navy-700 text-gray-500 hover:text-gray-300"
            )}
          >
            {s === 1 ? "Información General" : s === 2 ? "Posiciones" : "Estadísticas"}
          </button>
        ))}
      </div>

      {/* Paso 1: Información General */}
      {step === 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel p-6 space-y-4"
        >
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <User className="w-5 h-5 text-blue-400" />
            Información General
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Nombre</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full bg-navy-800 border border-navy-700 rounded-lg p-3 text-white focus:border-blue-500 focus:outline-none"
                placeholder="Ej: Jude"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Apellido</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full bg-navy-800 border border-navy-700 rounded-lg p-3 text-white focus:border-blue-500 focus:outline-none"
                placeholder="Ej: Bellingham"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Nombre Completo</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full bg-navy-800 border border-navy-700 rounded-lg p-3 text-white focus:border-blue-500 focus:outline-none"
              placeholder="Jude Bellingham"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                Fecha de Nacimiento
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="w-full bg-navy-800 border border-navy-700 rounded-lg p-3 text-white focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Nacionalidad</label>
              <input
                type="text"
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
                className="w-full bg-navy-800 border border-navy-700 rounded-lg p-3 text-white focus:border-blue-500 focus:outline-none"
                placeholder="Ej: Inglaterra"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1 flex items-center gap-1">
                <Ruler className="w-3.5 h-3.5" />
                Altura (cm)
              </label>
              <input
                type="number"
                name="height"
                value={formData.height}
                onChange={handleChange}
                className="w-full bg-navy-800 border border-navy-700 rounded-lg p-3 text-white focus:border-blue-500 focus:outline-none"
                placeholder="186"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1 flex items-center gap-1">
                <Weight className="w-3.5 h-3.5" />
                Peso (kg)
              </label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                className="w-full bg-navy-800 border border-navy-700 rounded-lg p-3 text-white focus:border-blue-500 focus:outline-none"
                placeholder="75"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1 flex items-center gap-1">
                <Footprints className="w-3.5 h-3.5" />
                Pierna
              </label>
              <select
                name="preferredFoot"
                value={formData.preferredFoot}
                onChange={handleChange}
                className="w-full bg-navy-800 border border-navy-700 rounded-lg p-3 text-white focus:border-blue-500 focus:outline-none"
              >
                <option value="RIGHT">Derecha</option>
                <option value="LEFT">Izquierda</option>
                <option value="BOTH">Ambas</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1 flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" />
                Valor (€)
              </label>
              <input
                type="number"
                name="marketValue"
                value={formData.marketValue}
                onChange={handleChange}
                className="w-full bg-navy-800 border border-navy-700 rounded-lg p-3 text-white focus:border-blue-500 focus:outline-none"
                placeholder="180000000"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1 flex items-center gap-1">
              <Shield className="w-3.5 h-3.5" />
              Club Actual
            </label>
            <input
              type="text"
              name="currentClub"
              value={formData.currentClub}
              onChange={handleChange}
              className="w-full bg-navy-800 border border-navy-700 rounded-lg p-3 text-white focus:border-blue-500 focus:outline-none"
              placeholder="Ej: Real Madrid"
            />
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => setStep(2)}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white font-medium transition-colors"
            >
              Siguiente →
            </button>
          </div>
        </motion.div>
      )}


      {/* Paso 2: Posiciones */}
      {step === 2 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel p-6 space-y-6"
        >
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-400" />
            Posiciones
          </h3>

          <div>
            <label className="block text-sm text-gray-400 mb-2">Posición Principal</label>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
              {positions.map((pos) => (
                <button
                  key={pos}
                  onClick={() => setFormData(prev => ({ ...prev, primaryPosition: pos }))}
                  className={cn(
                    "px-3 py-2 rounded-lg text-xs font-medium transition-all border",
                    formData.primaryPosition === pos
                      ? "bg-blue-500/20 border-blue-500/50 text-blue-400"
                      : "bg-navy-800 border-navy-700 text-gray-400 hover:text-white"
                  )}
                >
                  {positionLabels[pos]}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">Posiciones Secundarias</label>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
              {positions.filter(p => p !== formData.primaryPosition).map((pos) => (
                <button
                  key={pos}
                  onClick={() => toggleSecondaryPosition(pos)}
                  className={cn(
                    "px-3 py-2 rounded-lg text-xs font-medium transition-all border",
                    formData.secondaryPositions.includes(pos)
                      ? "bg-blue-500/20 border-blue-500/50 text-blue-400"
                      : "bg-navy-800 border-navy-700 text-gray-400 hover:text-white"
                  )}
                >
                  {positionLabels[pos]}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-between">
            <button
              onClick={() => setStep(1)}
              className="px-6 py-2 bg-navy-800 border border-navy-700 rounded-lg text-gray-400 hover:text-white transition-colors"
            >
              ← Anterior
            </button>
            <button
              onClick={() => setStep(3)}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white font-medium transition-colors"
            >
              Siguiente →
            </button>
          </div>
        </motion.div>
      )}

      {/* Paso 3: Estadísticas */}
      {step === 3 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel p-6 space-y-6"
        >
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Star className="w-5 h-5 text-blue-400" />
            Estadísticas
          </h3>

          <div className="text-center mb-6">
            <div className="text-5xl font-black text-blue-400">{stats.overallRating}</div>
            <div className="text-sm text-gray-500">Rating General</div>
          </div>

          {[
            { title: "Ataque", color: "from-red-500 to-orange-500", stats: [
              { key: "finishing", label: "Definición" },
              { key: "shotPower", label: "Potencia Tiro" },
              { key: "longShots", label: "Tiros Lejanos" },
              { key: "positioning", label: "Posicionamiento" },
              { key: "penalties", label: "Penales" },
            ]},
            { title: "Pase", color: "from-blue-500 to-cyan-500", stats: [
              { key: "vision", label: "Visión" },
              { key: "crossing", label: "Centros" },
              { key: "shortPassing", label: "Pase Corto" },
              { key: "longPassing", label: "Pase Largo" },
              { key: "curve", label: "Efecto" },
              { key: "freeKickAccuracy", label: "Tiros Libres" },
            ]},
            { title: "Defensa", color: "from-emerald-500 to-teal-500", stats: [
              { key: "marking", label: "Marcaje" },
              { key: "standingTackle", label: "Entrada Pie" },
              { key: "slidingTackle", label: "Entrada Desliz" },
              { key: "interceptions", label: "Intercepciones" },
              { key: "heading", label: "Cabeza" },
            ]},
            { title: "Físico", color: "from-yellow-500 to-amber-500", stats: [
              { key: "acceleration", label: "Aceleración" },
              { key: "sprintSpeed", label: "Vel. Sprint" },
              { key: "agility", label: "Agilidad" },
              { key: "balance", label: "Equilibrio" },
              { key: "jumping", label: "Salto" },
              { key: "stamina", label: "Resistencia" },
              { key: "strength", label: "Fuerza" },
              { key: "aggression", label: "Agresividad" },
            ]},
            { title: "Técnica", color: "from-purple-500 to-pink-500", stats: [
              { key: "pace", label: "Ritmo" },
              { key: "dribbling", label: "Regate" },
              { key: "ballControl", label: "Control" },
              { key: "reactions", label: "Reacción" },
              { key: "composure", label: "Compostura" },
            ]},
          ].map((group) => (
            <div key={group.title} className="bg-navy-800/50 rounded-xl p-4 border border-navy-700/30">
              <h4 className={cn("text-sm font-bold mb-3 bg-gradient-to-r bg-clip-text text-transparent", group.color)}>
                {group.title}
              </h4>
              <div className="space-y-3">
                {group.stats.map((stat) => (
                  <div key={stat.key} className="flex items-center gap-3">
                    <span className="text-xs text-gray-400 w-24 shrink-0">{stat.label}</span>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={stats[stat.key as keyof typeof stats] || 50}
                      onChange={(e) => handleStatChange(stat.key, parseInt(e.target.value))}
                      className="flex-1 accent-blue-500"
                    />
                    <span className="text-xs font-bold text-white w-8 text-right">
                      {stats[stat.key as keyof typeof stats] || 50}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="flex justify-between">
            <button
              onClick={() => setStep(2)}
              className="px-6 py-2 bg-navy-800 border border-navy-700 rounded-lg text-gray-400 hover:text-white transition-colors"
            >
              ← Anterior
            </button>
            <button
              onClick={handleSubmit}
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white font-medium transition-colors"
            >
              <Save className="w-4 h-4" />
              Guardar Jugador
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
