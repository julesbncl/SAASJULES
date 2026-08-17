import React from "react";
import { Topbar } from "@/components/layout/topbar";
import { Plus } from "lucide-react";
import Link from "next/link";
import { formatFCFA } from "@/lib/format";

export const revalidate = 0;

export default function QuotesPage() {
  const mockQuotes = [
    {
      id: "dev_01",
      number: "DEV-2026-0012",
      client: "Sahel Logistics SARL",
      title: "Extension Plateforme Logistique & API",
      amount: 4500000,
      date: "15/03/2026",
      status: "en_attente",
    },
    {
      id: "dev_02",
      number: "DEV-2026-0011",
      client: "Ivoire Green Agri",
      title: "Module Traçabilité Blockchain & IoT",
      amount: 6800000,
      date: "10/03/2026",
      status: "accepte",
    },
  ];

  return (
    <div className="min-h-full pb-16">
      <Topbar
        title="Devis & Factures Proforma"
        subtitle="Créez des propositions commerciales et convertissez-les en factures en 1 clic"
      />

      <div className="px-4 lg:px-8 py-6 space-y-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-white tracking-tight">
              Propositions Commerciales
            </h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 font-semibold tabular-nums">
              {mockQuotes.length} devis
            </span>
          </div>

          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Plus className="w-4 h-4" />
            <span>Nouveau Devis</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {mockQuotes.map((quote) => (
            <div
              key={quote.id}
              className="rounded-3xl bg-[#0c101a]/90 backdrop-blur-md p-6 border border-white/[0.07] space-y-4 hover:border-white/[0.14] transition-all"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="mono-font font-bold text-sm text-blue-400">
                    {quote.number}
                  </span>
                  <h3 className="font-bold text-white text-sm mt-1">
                    {quote.client}
                  </h3>
                  <p className="text-xs text-slate-400">{quote.title}</p>
                </div>

                <span
                  className={`text-xs px-2.5 py-1 rounded-full font-semibold border ${
                    quote.status === "accepte"
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                      : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                  }`}
                >
                  {quote.status === "accepte" ? "Accepté" : "En négociation"}
                </span>
              </div>

              <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-semibold">Montant Estimé</span>
                  <span className="font-extrabold text-white text-base tabular-nums">{formatFCFA(quote.amount)}</span>
                </div>

                <Link
                  href="/factures/nouvelle"
                  className="px-3 py-1.5 rounded-xl bg-white/[0.06] hover:bg-blue-600 text-slate-200 hover:text-white font-semibold transition-all"
                >
                  Convertir en Facture
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
