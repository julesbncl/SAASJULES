import React from "react";
import { Sparkles, ArrowUpRight, Lightbulb } from "lucide-react";

interface AIInsightCardProps {
  growthRate?: number;
  highlightText?: string;
  recommendation?: string;
}

export function AIInsightCard({
  growthRate,
  highlightText = "Votre volume facturé a progressé de +18% ce mois-ci.",
  recommendation = "3 factures arrivent à échéance cette semaine. Envoyez une relance en 1 clic pour optimiser votre trésorerie.",
}: AIInsightCardProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl p-6 border border-blue-500/20 shadow-lg shadow-blue-950/40 bg-gradient-to-br from-[#0c152e] via-[#091024] to-[#070b18] flex flex-col justify-between h-full group">
      {/* Background Starry Mesh Glow */}
      <div className="absolute -top-16 -right-16 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl pointer-events-none group-hover:bg-blue-400/25 transition-all duration-700" />
      <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-indigo-500/15 rounded-full blur-2xl pointer-events-none" />

      {/* Top Header with AI badge */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/15 text-blue-300 border border-blue-400/30 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
          <span>Assistant Jules AI</span>
          {growthRate !== undefined && (
            <span className="text-[10px] bg-blue-400/20 text-blue-200 px-1.5 py-0.2 rounded-full font-bold">
              +{growthRate}%
            </span>
          )}
        </div>

        <button 
          aria-label="Voir le détail de l'analyse IA"
          className="w-8 h-8 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.08] flex items-center justify-center text-slate-300 hover:text-white transition-all"
        >
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>

      {/* Content Body */}
      <div className="relative z-10 my-4 space-y-2">
        <h3 className="text-lg lg:text-xl font-bold text-white leading-snug tracking-tight">
          {highlightText}
        </h3>
        <p className="text-xs text-slate-300/80 leading-relaxed">
          {recommendation}
        </p>
      </div>

      {/* Footer / Status indicator */}
      <div className="relative z-10 flex items-center gap-2 pt-2 border-t border-white/[0.06]">
        <div className="flex gap-1">
          <span className="w-4 h-1.5 rounded-full bg-blue-500" />
          <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
          <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
        </div>
        <span className="text-[11px] font-medium text-slate-400 ml-auto flex items-center gap-1">
          <Lightbulb className="w-3 h-3 text-amber-400" />
          Optimisation Trésorerie
        </span>
      </div>
    </div>
  );
}
