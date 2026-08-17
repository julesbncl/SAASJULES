"use client";

import React, { useState } from "react";
import { formatFCFA } from "@/lib/format";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface MonthData {
  month: string;
  invoiced: number;
  collected: number;
}

interface MonthlyVolumeChartProps {
  data: MonthData[];
}

export function MonthlyVolumeChart({ data }: MonthlyVolumeChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(data.length - 1);

  const maxVal = Math.max(...data.map((d) => Math.max(d.invoiced, d.collected)), 1);

  const activeItem = hoveredIndex !== null ? data[hoveredIndex] : data[data.length - 1];

  return (
    <div className="relative rounded-3xl bg-[#0c101a]/90 backdrop-blur-md p-6 border border-white/[0.07] flex flex-col justify-between h-full group hover:border-white/[0.14] transition-all duration-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Évolution des Encaissements
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-extrabold text-white tracking-tight tabular-nums">
              {formatFCFA(activeItem.collected)}
            </span>
            <span className="text-xs text-slate-400 font-medium">
              en {activeItem.month} (Total facturé: {formatFCFA(activeItem.invoiced)})
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 bg-white/[0.04] px-2.5 py-1 rounded-full border border-white/[0.06]">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            <span>Encaissé</span>
            <span className="w-2 h-2 rounded-full bg-slate-700 ml-1" />
            <span>Facturé</span>
          </div>
        </div>
      </div>

      {/* Bar Chart Area */}
      <div className="pt-4 pb-2">
        <div className="flex items-end justify-between gap-3 h-36 px-2">
          {data.map((item, idx) => {
            const invoicedHeight = Math.round((item.invoiced / maxVal) * 100);
            const collectedHeight = Math.round((item.collected / maxVal) * 100);
            const isSelected = hoveredIndex === idx;

            return (
              <div
                key={item.month}
                className="flex-1 flex flex-col items-center gap-2 group/bar cursor-pointer"
                onMouseEnter={() => setHoveredIndex(idx)}
              >
                {/* Visual Bars Container */}
                <div className="relative w-full max-w-[38px] h-28 flex items-end justify-center">
                  {/* Background Bar (Total Invoiced) */}
                  <div
                    className={cn(
                      "w-full rounded-xl transition-all duration-300",
                      isSelected
                        ? "bg-[#1e293b] border border-white/10"
                        : "bg-[#141b29]"
                    )}
                    style={{ height: `${Math.max(invoicedHeight, 15)}%` }}
                  />

                  {/* Foreground Glowing Bar (Collected) */}
                  <div
                    className={cn(
                      "absolute bottom-0 w-full rounded-xl transition-all duration-300",
                      isSelected
                        ? "bg-gradient-to-t from-blue-600 via-blue-500 to-cyan-400 shadow-lg shadow-blue-500/40"
                        : "bg-gradient-to-t from-blue-700/80 to-blue-500/80 opacity-70 group-hover/bar:opacity-100"
                    )}
                    style={{ height: `${Math.max(collectedHeight, 10)}%` }}
                  />
                </div>

                {/* Month Label */}
                <span
                  className={cn(
                    "text-xs font-semibold transition-colors duration-150",
                    isSelected ? "text-blue-400 font-bold" : "text-slate-500"
                  )}
                >
                  {item.month}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Category breakdown preview */}
      <div className="pt-3 border-t border-white/[0.05] flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="text-slate-300 font-semibold tabular-nums">44</span>
            <span>Factures émises</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-emerald-400 font-semibold tabular-nums">85%</span>
            <span>Taux de conversion</span>
          </div>
        </div>

        <button className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-0.5 font-medium transition-colors">
          Rapport détaillé
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
