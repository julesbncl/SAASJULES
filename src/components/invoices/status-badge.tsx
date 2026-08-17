import React from "react";
import { InvoiceStatus } from "@/lib/data/types";
import { INVOICE_STATUS_LABELS } from "@/lib/constants";
import { CheckCircle2, Clock, AlertCircle, FileEdit } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: InvoiceStatus;
  className?: string;
  showIcon?: boolean;
}

export function StatusBadge({ status, className, showIcon = true }: StatusBadgeProps) {
  const label = INVOICE_STATUS_LABELS[status] || status;

  switch (status) {
    case "payee":
      return (
        <span
          className={cn(
            "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide",
            "bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 shadow-sm shadow-emerald-500/5",
            className
          )}
        >
          {showIcon && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
          {label}
        </span>
      );
    case "envoyee":
      return (
        <span
          className={cn(
            "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide",
            "bg-amber-500/10 text-amber-400 border border-amber-500/25 shadow-sm shadow-amber-500/5",
            className
          )}
        >
          {showIcon && <Clock className="w-3.5 h-3.5 text-amber-400" />}
          {label}
        </span>
      );
    case "en_retard":
      return (
        <span
          className={cn(
            "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide",
            "bg-rose-500/10 text-rose-400 border border-rose-500/25 shadow-sm shadow-rose-500/5 animate-pulse",
            className
          )}
        >
          {showIcon && <AlertCircle className="w-3.5 h-3.5 text-rose-400" />}
          {label}
        </span>
      );
    case "brouillon":
    default:
      return (
        <span
          className={cn(
            "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide",
            "bg-slate-500/10 text-slate-400 border border-slate-500/25 shadow-sm",
            className
          )}
        >
          {showIcon && <FileEdit className="w-3.5 h-3.5 text-slate-400" />}
          {label}
        </span>
      );
  }
}
