"use client";

import React, { useState } from "react";
import { Invoice } from "@/lib/data/types";
import { StatusBadge } from "@/components/invoices/status-badge";
import { formatFCFA, formatDateFr } from "@/lib/format";
import {
  Search,
  FileText,
  Download,
  ExternalLink,
  Plus,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface RecentInvoicesTableProps {
  invoices: Invoice[];
  onMarkAsPaid?: (id: string) => void;
}

export function RecentInvoicesTable({ invoices }: RecentInvoicesTableProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredInvoices = invoices.filter((inv) => {
    const matchesSearch =
      inv.invoiceNumber.toLowerCase().includes(search.toLowerCase()) ||
      inv.client?.name.toLowerCase().includes(search.toLowerCase()) ||
      inv.client?.companyName?.toLowerCase().includes(search.toLowerCase()) ||
      inv.notes?.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || inv.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="rounded-3xl bg-[#0c101a]/90 backdrop-blur-md p-6 border border-white/[0.07] shadow-xl shadow-black/30">
      {/* Header with Title and Search/Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-white tracking-tight">
              Dernières Factures
            </h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 font-semibold tabular-nums">
              {invoices.length} factures
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Suivi des émissions et encaissements en temps réel
          </p>
        </div>

        {/* Controls: Search, Filter Tabs, Action */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Search bar */}
          <div className="relative flex-1 sm:flex-initial min-w-[200px]">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Rechercher client, N°..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#131926] border border-white/[0.08] rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            />
          </div>

          {/* Status Filter Buttons (Desktop) */}
          <div className="hidden lg:flex items-center bg-[#131926] p-1 rounded-xl border border-white/[0.06] text-xs">
            <button
              onClick={() => setStatusFilter("all")}
              className={cn(
                "px-2.5 py-1 rounded-lg font-medium transition-all",
                statusFilter === "all"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              )}
            >
              Toutes
            </button>
            <button
              onClick={() => setStatusFilter("payee")}
              className={cn(
                "px-2.5 py-1 rounded-lg font-medium transition-all",
                statusFilter === "payee"
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              )}
            >
              Payées
            </button>
            <button
              onClick={() => setStatusFilter("envoyee")}
              className={cn(
                "px-2.5 py-1 rounded-lg font-medium transition-all",
                statusFilter === "envoyee"
                  ? "bg-amber-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              )}
            >
              Envoyées
            </button>
            <button
              onClick={() => setStatusFilter("en_retard")}
              className={cn(
                "px-2.5 py-1 rounded-lg font-medium transition-all",
                statusFilter === "en_retard"
                  ? "bg-rose-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              )}
            >
              En retard
            </button>
            <button
              onClick={() => setStatusFilter("brouillon")}
              className={cn(
                "px-2.5 py-1 rounded-lg font-medium transition-all",
                statusFilter === "brouillon"
                  ? "bg-slate-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              )}
            >
              Brouillons
            </button>
          </div>

          {/* Mobile Filter Selector */}
          <div className="lg:hidden">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-2.5 py-1.5 text-xs bg-[#131926] border border-white/[0.08] rounded-xl text-white focus:outline-none focus:border-blue-500"
            >
              <option value="all">Tous statuts</option>
              <option value="payee">Payées</option>
              <option value="envoyee">Envoyées</option>
              <option value="en_retard">En retard</option>
              <option value="brouillon">Brouillons</option>
            </select>
          </div>

          {/* New Invoice Button */}
          <Link
            href="/factures/nouvelle"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Créer</span>
          </Link>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/[0.06] text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              <th className="pb-3 pl-2">Facture</th>
              <th className="pb-3">Client</th>
              <th className="pb-3">Date d&apos;émission</th>
              <th className="pb-3">Échéance</th>
              <th className="pb-3">Statut</th>
              <th className="pb-3 text-right">Montant (FCFA)</th>
              <th className="pb-3 pr-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04] text-xs">
            {filteredInvoices.map((invoice) => {
              const clientInitials = invoice.client?.name
                ? invoice.client.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()
                : "CL";

              return (
                <tr
                  key={invoice.id}
                  className="hover:bg-white/[0.02] transition-colors group/row"
                >
                  {/* Invoice Number */}
                  <td className="py-4 pl-2 font-medium">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover/row:scale-105 transition-transform">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <Link
                          href={`/factures/${invoice.id}`}
                          className="font-bold text-white hover:text-blue-400 transition-colors mono-font"
                        >
                          {invoice.invoiceNumber}
                        </Link>
                        {invoice.paymentMethod && (
                          <div className="text-[11px] text-slate-500 truncate max-w-[140px]">
                            {invoice.paymentMethod}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Client */}
                  <td className="py-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 text-white font-bold text-[10px] flex items-center justify-center shadow-sm">
                        {clientInitials}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-200">
                          {invoice.client?.companyName || invoice.client?.name}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {invoice.client?.name}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Issue Date */}
                  <td className="py-4 text-slate-300 tabular-nums">
                    {formatDateFr(invoice.issueDate)}
                  </td>

                  {/* Due Date */}
                  <td className="py-4 text-slate-400 tabular-nums">
                    {formatDateFr(invoice.dueDate)}
                  </td>

                  {/* Status Badge */}
                  <td className="py-4">
                    <StatusBadge status={invoice.status} />
                  </td>

                  {/* Amount FCFA */}
                  <td className="py-4 text-right font-extrabold text-white tabular-nums text-sm">
                    {formatFCFA(invoice.total)}
                  </td>

                  {/* Action Menu */}
                  <td className="py-4 pr-2 text-right relative">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/factures/${invoice.id}`}
                        aria-label={`Voir la facture ${invoice.invoiceNumber}`}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors"
                        title="Voir la facture"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>

                      <Link
                        href={`/factures/${invoice.id}/pdf`}
                        aria-label={`Télécharger le PDF de la facture ${invoice.invoiceNumber}`}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors"
                        title="Imprimer / PDF"
                      >
                        <Download className="w-4 h-4" />
                      </Link>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Card List View */}
      <div className="block md:hidden space-y-3">
        {filteredInvoices.map((invoice) => (
          <div
            key={invoice.id}
            className="p-4 rounded-2xl bg-[#131926] border border-white/[0.06] space-y-3"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="mono-font font-bold text-sm text-white">
                  {invoice.invoiceNumber}
                </span>
                <div className="font-semibold text-slate-300 text-xs mt-0.5">
                  {invoice.client?.companyName || invoice.client?.name}
                </div>
              </div>
              <StatusBadge status={invoice.status} />
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-white/[0.05]">
              <div>
                <span>Émise le {formatDateFr(invoice.issueDate)}</span>
              </div>
              <div className="text-right">
                <span className="font-extrabold text-white text-sm tabular-nums">
                  {formatFCFA(invoice.total)}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-1">
              <Link
                href={`/factures/${invoice.id}`}
                className="px-3 py-1 text-xs rounded-lg bg-white/[0.06] text-slate-200 hover:bg-white/[0.1] flex items-center gap-1"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Détails
              </Link>
              <Link
                href={`/factures/${invoice.id}/pdf`}
                className="px-3 py-1 text-xs rounded-lg bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 border border-blue-500/30 flex items-center gap-1"
              >
                <Download className="w-3.5 h-3.5" />
                PDF
              </Link>
            </div>
          </div>
        ))}
      </div>

      {filteredInvoices.length === 0 && (
        <div className="text-center py-12 text-slate-500 text-xs">
          Aucune facture ne correspond à votre recherche.
        </div>
      )}
    </div>
  );
}
