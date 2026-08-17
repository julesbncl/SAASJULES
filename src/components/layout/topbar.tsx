"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Calendar,
  Plus,
  Bell,
  ChevronDown,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TopbarProps {
  title?: string;
  subtitle?: string;
}

export function Topbar({
  title = "Tableau de Bord",
  subtitle = "Vue globale de vos revenus et facturations",
}: TopbarProps) {
  const [period, setPeriod] = useState("Ce mois-ci");
  const [periodOpen, setPeriodOpen] = useState(false);

  const periods = [
    "Ce mois-ci (Mars 2026)",
    "Mois dernier (Fév 2026)",
    "Premier Trimestre (T1)",
    "Année en cours (2026)",
  ];

  return (
    <header className="sticky top-0 z-30 bg-[#07090e]/80 backdrop-blur-xl border-b border-white/[0.06] px-4 lg:px-8 py-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Left Title & Status */}
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl lg:text-2xl font-extrabold text-white tracking-tight">
              {title}
            </h1>
            <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              Direct
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2.5">
          {/* Period Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setPeriodOpen(!periodOpen)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-[#0d121c] border border-white/[0.08] text-xs font-semibold text-slate-200 hover:text-white hover:border-white/[0.15] transition-all"
            >
              <Calendar className="w-3.5 h-3.5 text-blue-400" />
              <span>{period}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-1" />
            </button>

            {periodOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-[#0f1422] border border-white/[0.1] shadow-2xl p-1.5 z-50 animate-in fade-in zoom-in-95">
                {periods.map((p) => (
                  <button
                    key={p}
                    onClick={() => {
                      setPeriod(p);
                      setPeriodOpen(false);
                    }}
                    className={cn(
                      "w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors",
                      period === p
                        ? "bg-blue-600/20 text-blue-300 font-semibold"
                        : "text-slate-300 hover:bg-white/[0.05] hover:text-white"
                    )}
                  >
                    <span>{p}</span>
                    {period === p && <Check className="w-3.5 h-3.5 text-blue-400" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick Notification Bell */}
          <button 
            aria-label="Notifications"
            className="relative p-2.5 rounded-2xl bg-[#0d121c] border border-white/[0.08] text-slate-300 hover:text-white hover:border-white/[0.15] transition-all"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-blue-500 shadow-sm shadow-blue-500" />
          </button>

          {/* New Invoice Action Button */}
          <Link
            href="/factures/nouvelle"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-xs font-bold shadow-lg shadow-blue-600/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Nouvelle Facture</span>
            <span className="sm:hidden">Facture</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
