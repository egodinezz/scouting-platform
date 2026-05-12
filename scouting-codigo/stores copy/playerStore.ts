"use client";

import { create } from "zustand";

export type Position = "GK" | "CB" | "LB" | "RB" | "DM" | "CM" | "AM" | "LW" | "RW" | "SS" | "ST";

interface Filters {
  search: string;
  positions: Position[];
  clubs: string[];
  nationalities: string[];
  minAge: number;
  maxAge: number;
  minRating: number;
  maxRating: number;
}

interface PlayerStore {
  filters: Filters;
  setFilters: (filters: Partial<Filters>) => void;
  resetFilters: () => void;
  selectedPlayerId: string | null;
  setSelectedPlayer: (id: string | null) => void;
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
}

const defaultFilters: Filters = {
  search: "",
  positions: [],
  clubs: [],
  nationalities: [],
  minAge: 15,
  maxAge: 45,
  minRating: 0,
  maxRating: 100,
};

export const usePlayerStore = create<PlayerStore>((set) => ({
  filters: defaultFilters,
  setFilters: (newFilters) =>
    set((state) => ({ filters: { ...state.filters, ...newFilters } })),
  resetFilters: () => set({ filters: defaultFilters }),
  selectedPlayerId: null,
  setSelectedPlayer: (id) => set({ selectedPlayerId: id }),
  viewMode: "grid",
  setViewMode: (mode) => set({ viewMode: mode }),
}));
