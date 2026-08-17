export const CURRENCY = "FCFA";
export const DEFAULT_VAT_RATE = 18; // 18% standard UEMOA / CEMAC

export const INVOICE_STATUS_LABELS = {
  payee: "Payée",
  envoyee: "Envoyée",
  en_retard: "En retard",
  brouillon: "Brouillon",
} as const;

export const INVOICE_STATUS_COLORS = {
  payee: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    border: "border-emerald-500/20",
    dot: "bg-emerald-400",
  },
  envoyee: {
    bg: "bg-amber-500/10",
    text: "text-amber-400",
    border: "border-amber-500/20",
    dot: "bg-amber-400",
  },
  en_retard: {
    bg: "bg-rose-500/10",
    text: "text-rose-400",
    border: "border-rose-500/20",
    dot: "bg-rose-400",
  },
  brouillon: {
    bg: "bg-slate-500/10",
    text: "text-slate-400",
    border: "border-slate-500/20",
    dot: "bg-slate-400",
  },
} as const;
