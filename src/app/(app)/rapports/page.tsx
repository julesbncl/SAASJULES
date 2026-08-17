import React from "react";
import { Topbar } from "@/components/layout/topbar";
import { invoicesRepo } from "@/lib/data";
import { formatFCFA } from "@/lib/format";
import { Download, DollarSign } from "lucide-react";
import { MonthlyVolumeChart } from "@/components/dashboard/monthly-volume-chart";

export const revalidate = 0;

export default async function ReportsPage() {
  const stats = await invoicesRepo.getDashboardStats();

  return (
    <div className="min-h-full pb-16">
      <Topbar
        title="Rapports Comptables & Fiscaux"
        subtitle="Déclaration de TVA UEMOA, journal des ventes et export comptable"
      />

      <div className="px-4 lg:px-8 py-6 space-y-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="p-6 rounded-3xl bg-[#0c101a]/90 backdrop-blur-md border border-white/[0.07] space-y-4">
            <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-blue-400" />
              Récapitulatif TVA Collectée (18%)
            </h3>
            <p className="text-xs text-slate-400">
              Montant de la taxe sur la valeur ajoutée collectée sur la période
            </p>

            <div className="p-4 rounded-2xl bg-[#131926] border border-white/[0.05] space-y-2">
              <div className="flex justify-between text-xs text-slate-400">
                <span>Total Facturé HT</span>
                <span className="font-semibold text-white tabular-nums">
                  {formatFCFA(Math.round(stats.totalInvoiced / 1.18))}
                </span>
              </div>
              <div className="flex justify-between text-xs text-slate-400">
                <span>TVA 18% Collectée</span>
                <span className="font-bold text-amber-400 tabular-nums">
                  {formatFCFA(Math.round(stats.totalInvoiced - stats.totalInvoiced / 1.18))}
                </span>
              </div>
            </div>

            <button className="w-full py-2.5 rounded-2xl bg-white/[0.05] hover:bg-white/[0.1] text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all">
              <Download className="w-4 h-4" />
              <span>Exporter le journal des ventes (CSV / Excel)</span>
            </button>
          </div>

          <div className="min-h-[300px]">
            <MonthlyVolumeChart data={stats.monthlyVolume} />
          </div>
        </div>
      </div>
    </div>
  );
}
