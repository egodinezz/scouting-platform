"use client";

import { useParams } from "next/navigation";
import { PlayerProfile } from "@/components/players/PlayerProfile";
import { usePlayersStore } from "@/stores/playersStore";

export default function PlayerDetailPage() {
  const params = useParams();
  const { players } = usePlayersStore();
  
  const player = players.find((p) => p.id === params.id);

  if (!player) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-6xl mb-4">⚽</div>
          <h2 className="text-2xl font-bold text-white mb-2">Jugador no encontrado</h2>
          <p className="text-gray-500">El jugador que buscas no existe en la base de datos</p>
        </div>
      </div>
    );
  }

  return <PlayerProfile player={player} />;
}