import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { clientsRepo, invoicesRepo } from "@/lib/data";
import { RecentInvoicesTable } from "@/components/dashboard/recent-invoices-table";
import { ClientActions } from "@/components/clients/client-actions";
import { formatFCFA } from "@/lib/format";
import {
  ChevronLeft,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export const revalidate = 0;

interface ClientDetailPageProps {
  params: {
    id: string;
  };
}

export default async function ClientDetailPage({ params }: ClientDetailPageProps) {
  const client = await clientsRepo.getById(params.id);

  if (!client) {
    notFound();
  }

  const clientInvoices = await invoicesRepo.getAll({ clientId: client.id });

  const totalInvoiced = clientInvoices.reduce((acc, inv) => acc + inv.total, 0);
  const totalPaid = clientInvoices
    .filter((inv) => inv.status === "payee")
    .reduce((acc, inv) => acc + inv.total, 0);

  return (
    <div className="min-h-full pb-16">
      {/* Top action header */}
      <div className="sticky top-0 z-20 bg-[#07090e]/80 backdrop-blur-xl border-b border-white/[0.06] px-4 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 max-w-6xl mx-auto">
          <Link
            href="/clients"
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Tous les clients</span>
          </Link>

          <ClientActions client={client} />
        </div>
      </div>

      <div className="px-4 lg:px-8 py-8 space-y-6 max-w-6xl mx-auto">
        {/* Client Profile Card */}
        <div className="rounded-3xl bg-[#0c101a] border border-white/[0.08] p-6 lg:p-8 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-600/20">
                {client.name.substring(0, 2).toUpperCase()}
              </div>
              <div>
                <h1 className="text-2xl font-extrabold text-white tracking-tight">
                  {client.companyName || client.name}
                </h1>
                <p className="text-sm text-slate-400 font-medium">Contact : {client.name}</p>
                <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-slate-500" />
                    {client.email}
                  </span>
                  <span className="flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-slate-500" />
                    {client.phone}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    {client.city}, {client.country}
                  </span>
                </div>
              </div>
            </div>

            {/* Financial stats for client */}
            <div className="flex gap-4 p-4 rounded-2xl bg-[#131926] border border-white/[0.06]">
              <div>
                <span className="text-[10px] uppercase font-semibold text-slate-500 block">Total Facturé</span>
                <span className="text-base font-extrabold text-white tabular-nums">{formatFCFA(totalInvoiced)}</span>
              </div>
              <div className="w-px bg-white/[0.08]" />
              <div>
                <span className="text-[10px] uppercase font-semibold text-slate-500 block">Total Réglé</span>
                <span className="text-base font-extrabold text-emerald-400 tabular-nums">{formatFCFA(totalPaid)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Client Invoices List */}
        <div>
          <div className="mb-4">
            <h3 className="text-lg font-bold text-white tracking-tight">
              Historique des factures de ce client
            </h3>
            <p className="text-xs text-slate-400">
              {clientInvoices.length} factures enregistrées
            </p>
          </div>
          <RecentInvoicesTable invoices={clientInvoices} />
        </div>
      </div>
    </div>
  );
}
