import React from "react";
import { Topbar } from "@/components/layout/topbar";
import { RecentInvoicesTable } from "@/components/dashboard/recent-invoices-table";
import { invoicesRepo } from "@/lib/data";
import { formatFCFA } from "@/lib/format";
import {
  FileText,
  CheckCircle2,
  Clock,
  AlertTriangle,
} from "lucide-react";

export const revalidate = 0;

export default async function InvoicesListPage() {
  const invoices = await invoicesRepo.getAll();
  const stats = await invoicesRepo.getDashboardStats();

  return (
    <div className="min-h-full pb-16">
      <Topbar
        title="Gestion des Factures"
        subtitle="Consultez, filtrez et gérez l'ensemble de vos factures clients"
      />

      <div className="px-4 lg:px-8 py-6 space-y-6 max-w-7xl mx-auto">
        {/* KPI Mini Header */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-[#0c101a] border border-white/[0.07]">
            <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold uppercase mb-1">
              <FileText className="w-3.5 h-3.5 text-blue-400" />
              <span>Total Émis</span>
            </div>
            <div className="text-xl font-extrabold text-white tabular-nums">
              {formatFCFA(stats.totalInvoiced)}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#0c101a] border border-white/[0.07]">
            <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold uppercase mb-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Total Encaissé</span>
            </div>
            <div className="text-xl font-extrabold text-emerald-400 tabular-nums">
              {formatFCFA(stats.totalPaid)}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#0c101a] border border-white/[0.07]">
            <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold uppercase mb-1">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>En Attente</span>
            </div>
            <div className="text-xl font-extrabold text-amber-400 tabular-nums">
              {formatFCFA(stats.totalPending)}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#0c101a] border border-white/[0.07]">
            <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold uppercase mb-1">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
              <span>En Retard</span>
            </div>
            <div className="text-xl font-extrabold text-rose-400 tabular-nums">
              {formatFCFA(stats.totalOverdue)}
            </div>
          </div>
        </div>

        {/* Invoices Table */}
        <RecentInvoicesTable invoices={invoices} />
      </div>
    </div>
  );
}
