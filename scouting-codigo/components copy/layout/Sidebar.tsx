"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard, Users, Plus, ArrowLeftRight, FileText, Star, BarChart3, Settings,
  ChevronLeft, ChevronRight, LogOut,
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Jugadores", href: "/players", icon: Users },
  { name: "Agregar Jugador", href: "/players/new", icon: Plus },
  { name: "Comparar", href: "/compare", icon: ArrowLeftRight },
  { name: "Reportes", href: "/reports", icon: FileText },
  { name: "Favoritos", href: "/favorites", icon: Star },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Configuración", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 80 : 260 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed left-0 top-0 h-screen bg-navy-900 border-r border-navy-700/50 z-50 flex flex-col"
    >
      <div className="flex items-center h-16 px-4 border-b border-navy-700/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shrink-0">
            <span className="text-white font-black text-lg">S</span>
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
                <h1 className="text-xl font-bold text-white tracking-tight">SCOUT<span className="text-blue-400">PRO</span></h1>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <nav className="flex-1 px-3 py-6 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative",
                isActive
                  ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                  : "text-gray-400 hover:bg-navy-800 hover:text-white"
              )}
            >
              <item.icon className={cn("w-5 h-5 shrink-0", isActive && "text-blue-400")} />
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    className="text-sm font-medium whitespace-nowrap"
                  >
                    {item.name}
                  </motion.span>
                )}
              </AnimatePresence>
              {isActive && (
                <motion.div layoutId="activeNav" className="absolute left-0 w-1 h-8 bg-blue-500 rounded-r-full" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-navy-700/50">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center p-2 rounded-xl text-gray-500 hover:bg-navy-800 hover:text-white transition-colors"
        >
          {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
      </div>

      <div className="p-4 border-t border-navy-700/50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shrink-0">
            <span className="text-white text-sm font-bold">JD</span>
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">John Doe</p>
                <p className="text-xs text-gray-500">Scout Senior</p>
              </motion.div>
            )}
          </AnimatePresence>
          <button className="text-gray-500 hover:text-red-400 transition-colors">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.aside>
  );
}
