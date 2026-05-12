import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Scout Pro - Plataforma de Scouting de Futbolistas",
  description: "Base de datos interactiva de scouting y análisis de jugadores de fútbol",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="dark">
      <body className={`${inter.variable} font-sans`}>{children}</body>
    </html>
  );
}
