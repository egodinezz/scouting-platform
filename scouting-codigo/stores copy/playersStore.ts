"use client";

import { create } from "zustand";

interface Player {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  dateOfBirth: string;
  age: number;
  nationality: string;
  height: number;
  weight: number;
  preferredFoot: string;
  primaryPosition: string;
  secondaryPositions: string[];
  currentClub: string;
  marketValue: number;
  photoUrl: string | null;
  stats: any;
}

interface PlayersStore {
  players: Player[];
  addPlayer: (player: Player) => void;
}

const initialPlayers: Player[] = [
  {
    id: "1",
    firstName: "Jude",
    lastName: "Bellingham",
    fullName: "Jude Bellingham",
    dateOfBirth: "2003-06-29",
    age: 22,
    nationality: "Inglaterra",
    height: 186,
    weight: 75,
    preferredFoot: "RIGHT",
    primaryPosition: "CM",
    secondaryPositions: ["AM", "DM"],
    currentClub: "Real Madrid",
    marketValue: 180000000,
    photoUrl: null,
    stats: {
      overallRating: 88,
      pace: 83, shooting: 78, passing: 88, dribbling: 88, defending: 78, physical: 84,
      finishing: 78, shotPower: 82, longShots: 80, positioning: 85, penalties: 70,
      vision: 88, crossing: 75, shortPassing: 90, longPassing: 86, curve: 78, freeKickAccuracy: 72,
      marking: 65, standingTackle: 78, slidingTackle: 75, interceptions: 82, heading: 80,
      acceleration: 82, sprintSpeed: 84, agility: 85, balance: 84, jumping: 85, stamina: 90, strength: 84, aggression: 82,
      dribbling: 88, ballControl: 90, reactions: 88, composure: 92,
    },
  },
  {
    id: "2",
    firstName: "Pedri",
    lastName: "González",
    fullName: "Pedri González",
    dateOfBirth: "2002-11-25",
    age: 23,
    nationality: "España",
    height: 174,
    weight: 68,
    preferredFoot: "RIGHT",
    primaryPosition: "CM",
    secondaryPositions: ["AM"],
    currentClub: "Barcelona",
    marketValue: 120000000,
    photoUrl: null,
    stats: {
      overallRating: 85,
      pace: 83, shooting: 72, passing: 92, dribbling: 90, defending: 72, physical: 68,
      finishing: 72, shotPower: 70, longShots: 75, positioning: 80, penalties: 65,
      vision: 92, crossing: 78, shortPassing: 94, longPassing: 88, curve: 82, freeKickAccuracy: 75,
      marking: 60, standingTackle: 72, slidingTackle: 68, interceptions: 78, heading: 65,
      acceleration: 84, sprintSpeed: 82, agility: 90, balance: 88, jumping: 70, stamina: 88, strength: 68, aggression: 65,
      dribbling: 90, ballControl: 94, reactions: 88, composure: 90,
    },
  },
  {
    id: "3",
    firstName: "Jamal",
    lastName: "Musiala",
    fullName: "Jamal Musiala",
    dateOfBirth: "2003-02-26",
    age: 23,
    nationality: "Alemania",
    height: 184,
    weight: 72,
    preferredFoot: "RIGHT",
    primaryPosition: "AM",
    secondaryPositions: ["LW", "CM"],
    currentClub: "Bayern Munich",
    marketValue: 140000000,
    photoUrl: null,
    stats: {
      overallRating: 86,
      pace: 87, shooting: 80, passing: 88, dribbling: 92, defending: 65, physical: 72,
      finishing: 80, shotPower: 78, longShots: 82, positioning: 85, penalties: 75,
      vision: 88, crossing: 76, shortPassing: 90, longPassing: 82, curve: 85, freeKickAccuracy: 78,
      marking: 55, standingTackle: 65, slidingTackle: 60, interceptions: 70, heading: 60,
      acceleration: 88, sprintSpeed: 86, agility: 92, balance: 90, jumping: 72, stamina: 85, strength: 72, aggression: 60,
      dribbling: 92, ballControl: 92, reactions: 88, composure: 88,
    },
  },
  {
    id: "4",
    firstName: "Florian",
    lastName: "Wirtz",
    fullName: "Florian Wirtz",
    dateOfBirth: "2003-05-03",
    age: 22,
    nationality: "Alemania",
    height: 176,
    weight: 70,
    preferredFoot: "RIGHT",
    primaryPosition: "AM",
    secondaryPositions: ["LW", "SS"],
    currentClub: "Bayer Leverkusen",
    marketValue: 130000000,
    photoUrl: null,
    stats: {
      overallRating: 85,
      pace: 85, shooting: 78, passing: 90, dribbling: 90, defending: 62, physical: 70,
      finishing: 78, shotPower: 76, longShots: 82, positioning: 84, penalties: 72,
      vision: 90, crossing: 80, shortPassing: 92, longPassing: 85, curve: 84, freeKickAccuracy: 80,
      marking: 50, standingTackle: 62, slidingTackle: 58, interceptions: 68, heading: 55,
      acceleration: 86, sprintSpeed: 84, agility: 90, balance: 86, jumping: 68, stamina: 84, strength: 70, aggression: 58,
      dribbling: 90, ballControl: 91, reactions: 86, composure: 88,
    },
  },
  {
    id: "5",
    firstName: "Eduardo",
    lastName: "Camavinga",
    fullName: "Eduardo Camavinga",
    dateOfBirth: "2002-11-10",
    age: 23,
    nationality: "Francia",
    height: 182,
    weight: 74,
    preferredFoot: "LEFT",
    primaryPosition: "DM",
    secondaryPositions: ["CM", "LB"],
    currentClub: "Real Madrid",
    marketValue: 90000000,
    photoUrl: null,
    stats: {
      overallRating: 82,
      pace: 83, shooting: 62, passing: 84, dribbling: 82, defending: 82, physical: 80,
      finishing: 58, shotPower: 65, longShots: 60, positioning: 72, penalties: 55,
      vision: 82, crossing: 75, shortPassing: 86, longPassing: 84, curve: 72, freeKickAccuracy: 65,
      marking: 78, standingTackle: 85, slidingTackle: 82, interceptions: 86, heading: 75,
      acceleration: 82, sprintSpeed: 84, agility: 84, balance: 86, jumping: 78, stamina: 88, strength: 80, aggression: 82,
      dribbling: 82, ballControl: 86, reactions: 84, composure: 82,
    },
  },
  {
    id: "6",
    firstName: "Gavi",
    lastName: "Gavi",
    fullName: "Gavi",
    dateOfBirth: "2004-08-05",
    age: 21,
    nationality: "España",
    height: 173,
    weight: 68,
    preferredFoot: "RIGHT",
    primaryPosition: "CM",
    secondaryPositions: ["DM", "LW"],
    currentClub: "Barcelona",
    marketValue: 90000000,
    photoUrl: null,
    stats: {
      overallRating: 80,
      pace: 85, shooting: 65, passing: 86, dribbling: 86, defending: 78, physical: 76,
      finishing: 65, shotPower: 68, longShots: 62, positioning: 75, penalties: 60,
      vision: 85, crossing: 72, shortPassing: 88, longPassing: 82, curve: 70, freeKickAccuracy: 65,
      marking: 72, standingTackle: 80, slidingTackle: 82, interceptions: 84, heading: 65,
      acceleration: 86, sprintSpeed: 84, agility: 88, balance: 86, jumping: 70, stamina: 92, strength: 72, aggression: 90,
      dribbling: 86, ballControl: 88, reactions: 86, composure: 78,
    },
  },
];

export const usePlayersStore = create<PlayersStore>((set) => ({
  players: initialPlayers,
  addPlayer: (player) => set((state) => ({ players: [...state.players, player] })),
}));
