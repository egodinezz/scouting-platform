"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FavoritePlayer {
  id: string;
  fullName: string;
  currentClub: string;
  primaryPosition: string;
  age: number;
  nationality: string;
  marketValue: number;
  overallRating: number;
}

interface FavoritesStore {
  favorites: FavoritePlayer[];
  addFavorite: (player: FavoritePlayer) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favorites: [],
      addFavorite: (player) => {
        const exists = get().favorites.some((f) => f.id === player.id);
        if (!exists) {
          set((state) => ({ favorites: [...state.favorites, player] }));
        }
      },
      removeFavorite: (id) => {
        set((state) => ({ favorites: state.favorites.filter((f) => f.id !== id) }));
      },
      isFavorite: (id) => get().favorites.some((f) => f.id === id),
    }),
    {
      name: "scout-pro-favorites",
    }
  )
);
