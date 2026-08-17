import React from "react";
import { Topbar } from "@/components/layout/topbar";
import { clientsRepo } from "@/lib/data";
import { formatFCFA } from "@/lib/format";
import {
  Mail,
  Phone,
  Plus,
  ArrowUpRight,
  ExternalLink,
  MapPin,
} from "lucide-react";
import Link from "next/link";

export const revalidate = 0;

export default async function ClientsListPage() {
  const clients = await clientsRepo.getAll();

  return (
    <div className="min-h-full pb-16">
      <Topbar
        title="Répertoire Clients"
        subtitle="Gérez votre portefeuille de clients et suivez leurs volumes d'achats"
      />

      <div className="px-4 lg:px-8 py-6 space-y-6 max-w-7xl mx-auto">
        {/* Header Action */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-white tracking-tight">
              Tous les Clients
            </h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 font-semibold tabular-nums">
              {clients.length} clients
            </span>
          </div>

          <Link
            href="/clients/nouveau"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Plus className="w-4 h-4" />
            <span>Nouveau Client</span>
          </Link>
        </div>

        {/* Clients Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {clients.map((client) => {
            const initials = client.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase();

            return (
              <div
                key={client.id}
                className="rounded-3xl bg-[#0c101a]/90 backdrop-blur-md p-6 border border-white/[0.07] hover:border-white/[0.14] transition-all hover:shadow-xl hover:shadow-black/40 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white font-extrabold text-sm shadow-md">
                        {initials}
                      </div>
                      <div>
                        <h3 className="font-bold text-sm text-white group-hover:text-blue-400 transition-colors">
                          {client.companyName || client.name}
                        </h3>
                        <p className="text-xs text-slate-400">
                          {client.name}
                        </p>
                      </div>
                    </div>

                    <Link
                      href={`/clients/${client.id}`}
                      className="p-2 rounded-xl bg-white/[0.04] text-slate-400 hover:text-white hover:bg-white/[0.08] transition-all"
                      title="Voir la fiche client"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>

                  <div className="space-y-2 text-xs text-slate-400 pt-2 border-t border-white/[0.05]">
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <span className="truncate">{client.email}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <span>{client.phone}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <span>{client.city}, {client.country}</span>
                    </div>

                    {client.ifu && (
                      <div className="text-[11px] text-slate-500 pt-1 mono-font">
                        IFU : {client.ifu}
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-white/[0.06] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-slate-500 block">
                      Total Facturé
                    </span>
                    <span className="font-extrabold text-white text-sm tabular-nums">
                      {formatFCFA(client.totalInvoiced || 0)}
                    </span>
                  </div>

                  <Link
                    href={`/clients/${client.id}`}
                    className="text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1"
                  >
                    <span>Fiche & Factures</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
