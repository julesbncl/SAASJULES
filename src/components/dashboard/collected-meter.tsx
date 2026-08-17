"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";
import { formatFCFA } from "@/lib/format";

interface CollectedMeterProps {
  percentage: number; // e.g. 68
  collectedAmount: number; // e.g. 10100000
  monthlyGoal: number; // e.g. 15000000
  growthRate?: number; // e.g. 7
}

export function CollectedMeter({
  percentage = 68,
  collectedAmount = 10100000,
  monthlyGoal = 15000000,
  growthRate = 7,
}: CollectedMeterProps) {
  return (
    <div className="relative rounded-3xl bg-[#0c101a]/90 backdrop-blur-md p-6 border border-white/[0.07] flex flex-col justify-between h-full group hover:border-white/[0.14] transition-all duration-200">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Taux de recouvrement
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-extrabold text-white tracking-tight tabular-nums">
              {formatFCFA(collectedAmount)}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <ArrowUpRight className="w-3.5 h-3.5" />
          +{growthRate}%
        </div>
      </div>

      {/* Semi-circular Meter */}
      <div className="relative flex flex-col items-center justify-center my-4">
        <svg
          width="180"
          height="100"
          viewBox="0 0 160 90"
          className="overflow-visible"
        >
          {/* Background Track Arc */}
          <path
            d="M 15 80 A 65 65 0 0 1 145 80"
            fill="none"
            stroke="#161f30"
            strokeWidth="12"
            strokeLinecap="round"
          />
          {/* Progress Arc with glowing gradient */}
          <path
            d="M 15 80 A 65 65 0 0 1 145 80"
            fill="none"
            stroke="url(#meterGradient)"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={204.2}
            strokeDashoffset={204.2 - (percentage / 100) * 204.2}
            className="transition-all duration-1000 ease-out"
          />
          {/* Gradient definition */}
          <defs>
            <linearGradient id="meterGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2563eb" />
              <stop offset="60%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#60a5fa" />
            </linearGradient>
          </defs>
        </svg>

        {/* Center Percentage Display */}
        <div className="absolute top-[38px] text-center">
          <span className="text-3xl font-extrabold text-white tracking-tight tabular-nums">
            {percentage}%
          </span>
          <span className="block text-[11px] font-medium text-slate-400 uppercase tracking-wider">
            Encaissé
          </span>
        </div>
      </div>

      {/* Bottom Legend / Targets */}
      <div className="pt-2 border-t border-white/[0.05] flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#38bdf8] shadow-sm shadow-blue-500/50" />
          <span>Encaissé ce mois</span>
        </div>
        <div className="flex items-center gap-1.5 font-medium text-slate-300 tabular-nums">
          <span className="w-2 h-2 rounded-full bg-[#1e293b]" />
          <span>Obj. {formatFCFA(monthlyGoal)}</span>
        </div>
      </div>
    </div>
  );
}
