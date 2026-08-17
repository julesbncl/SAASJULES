import React from "react";
import { ArrowUpRight, ArrowDownRight, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatFCFA } from "@/lib/format";

interface StatCardProps {
  title: string;
  amount: number;
  subtitle?: string;
  change?: {
    value: number;
    isPositive: boolean;
    periodText?: string;
  };
  icon: LucideIcon;
  iconColorClass?: string;
  iconBgClass?: string;
  accentBorderClass?: string;
  badge?: string;
}

export function StatCard({
  title,
  amount,
  subtitle,
  change,
  icon: Icon,
  iconColorClass = "text-blue-400",
  iconBgClass = "bg-blue-500/10 border-blue-500/20",
  accentBorderClass,
  badge,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "relative rounded-3xl bg-[#0c101a]/90 backdrop-blur-md p-5 border border-white/[0.07]",
        "transition-all duration-200 hover:border-white/[0.14] hover:shadow-xl hover:shadow-black/40 group",
        accentBorderClass
      )}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          {title}
        </span>
        <div
          className={cn(
            "w-9 h-9 rounded-2xl flex items-center justify-center border transition-transform duration-200 group-hover:scale-110",
            iconBgClass
          )}
        >
          <Icon className={cn("w-4 h-4", iconColorClass)} />
        </div>
      </div>

      <div className="space-y-1">
        <div className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight tabular-nums">
          {formatFCFA(amount)}
        </div>

        <div className="flex items-center gap-2 pt-1">
          {change && (
            <span
              className={cn(
                "inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-full border",
                change.isPositive
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                  : "bg-rose-500/10 text-rose-400 border-rose-500/20"
              )}
            >
              {change.isPositive ? (
                <ArrowUpRight className="w-3 h-3 mr-0.5" />
              ) : (
                <ArrowDownRight className="w-3 h-3 mr-0.5" />
              )}
              {change.isPositive ? "+" : "-"}
              {Math.abs(change.value)}%
            </span>
          )}

          {change?.periodText && (
            <span className="text-xs text-slate-500">{change.periodText}</span>
          )}

          {subtitle && !change && (
            <span className="text-xs text-slate-400">{subtitle}</span>
          )}

          {badge && (
            <span className="ml-auto text-xs px-2 py-0.5 rounded-md bg-white/[0.05] text-slate-400 border border-white/[0.05]">
              {badge}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
