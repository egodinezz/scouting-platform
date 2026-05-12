import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Crear jugadores de ejemplo
  const players = [
    {
      firstName: "Jude",
      lastName: "Bellingham",
      fullName: "Jude Bellingham",
      dateOfBirth: new Date("2003-06-29"),
      age: 22,
      nationality: "Inglaterra",
      height: 186,
      weight: 75,
      preferredFoot: "RIGHT",
      primaryPosition: "CM",
      secondaryPositions: ["AM", "DM"],
      currentClub: "Real Madrid",
      marketValue: 180000000,
      stats: {
        overallRating: 88,
        finishing: 78, shotPower: 82, longShots: 80, positioning: 85, penalties: 70,
        vision: 88, crossing: 75, shortPassing: 90, longPassing: 86, curve: 78, freeKickAccuracy: 72,
        marking: 65, standingTackle: 78, slidingTackle: 75, interceptions: 82, heading: 80,
        acceleration: 82, sprintSpeed: 84, agility: 85, balance: 84, jumping: 85, stamina: 90, strength: 84, aggression: 82,
        pace: 83,
        dribbling: 88, ballControl: 90, reactions: 88, composure: 92,
      },
    },
    {
      firstName: "Pedri",
      lastName: "González",
      fullName: "Pedri González",
      dateOfBirth: new Date("2002-11-25"),
      age: 23,
      nationality: "España",
      height: 174,
      weight: 68,
      preferredFoot: "RIGHT",
      primaryPosition: "CM",
      secondaryPositions: ["AM"],
      currentClub: "Barcelona",
      marketValue: 120000000,
      stats: {
        overallRating: 85,
        finishing: 72, shotPower: 70, longShots: 75, positioning: 80, penalties: 65,
        vision: 92, crossing: 78, shortPassing: 94, longPassing: 88, curve: 82, freeKickAccuracy: 75,
        marking: 60, standingTackle: 72, slidingTackle: 68, interceptions: 78, heading: 65,
        acceleration: 84, sprintSpeed: 82, agility: 90, balance: 88, jumping: 70, stamina: 88, strength: 68, aggression: 65,
        pace: 83,
        dribbling: 90, ballControl: 94, reactions: 88, composure: 90,
      },
    },
  ];

  for (const playerData of players) {
    const { stats, ...playerInfo } = playerData;

    const player = await prisma.player.create({
      data: {
        ...playerInfo,
        stats: {
          create: stats,
        },
      },
    });

    console.log(`Created player: ${player.fullName}`);
  }

  console.log("Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
