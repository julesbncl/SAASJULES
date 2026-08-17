import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { invoicesRepo, companyRepo } from "@/lib/data";
import { StatusBadge } from "@/components/invoices/status-badge";
import { InvoiceActions } from "@/components/invoices/invoice-actions";
import { formatFCFA, formatDateFr } from "@/lib/format";
import {
  ChevronLeft,
  Building2,
  Mail,
  Phone,
} from "lucide-react";

export const revalidate = 0;

interface InvoiceDetailPageProps {
  params: {
    id: string;
  };
}

export default async function InvoiceDetailPage({ params }: InvoiceDetailPageProps) {
  const invoice = await invoicesRepo.getById(params.id);
  const company = await companyRepo.getCompany();

  if (!invoice) {
    notFound();
  }

  return (
    <div className="min-h-full pb-16">
      {/* Top Action Bar */}
      <div className="sticky top-0 z-20 bg-[#07090e]/80 backdrop-blur-xl border-b border-white/[0.06] px-4 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 max-w-5xl mx-auto">
          <Link
            href="/factures"
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Toutes les factures</span>
          </Link>

          <InvoiceActions invoice={invoice} />
        </div>
      </div>

      {/* Invoice Document Paper Container */}
      <div className="px-4 lg:px-8 py-8 max-w-5xl mx-auto">
        <div className="rounded-3xl bg-[#0c101a] border border-white/[0.08] p-6 lg:p-10 shadow-2xl shadow-black/50 space-y-8">
          {/* Header: Company & Invoice Reference */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-white/[0.07]">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center text-white font-black text-sm shadow-md">
                  J
                </div>
                <h2 className="text-xl font-extrabold text-white tracking-tight">
                  {company.name}
                </h2>
              </div>
              <p className="text-xs text-slate-400">{company.legalStatus} • {company.address}, {company.city} ({company.country})</p>
              <p className="text-xs text-slate-400">Email : {company.email} | Tél : {company.phone}</p>
              {company.ifu && (
                <p className="text-xs text-slate-400">N° IFU / RCCM : <span className="mono-font text-slate-300 font-semibold">{company.ifu}</span></p>
              )}
            </div>

            <div className="text-left md:text-right space-y-1.5">
              <div className="inline-block">
                <StatusBadge status={invoice.status} />
              </div>
              <div className="text-2xl font-extrabold text-white mono-font">
                {invoice.invoiceNumber}
              </div>
              <div className="text-xs text-slate-400">
                Date d&apos;émission : <span className="text-slate-200 font-medium tabular-nums">{formatDateFr(invoice.issueDate)}</span>
              </div>
              <div className="text-xs text-slate-400">
                Date d&apos;échéance : <span className="text-amber-400 font-semibold tabular-nums">{formatDateFr(invoice.dueDate)}</span>
              </div>
            </div>
          </div>

          {/* Client Destination Info */}
          <div className="p-5 rounded-2xl bg-[#131926] border border-white/[0.06] flex flex-col md:flex-row justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Facturé à :
              </span>
              <div className="text-base font-bold text-white flex items-center gap-2">
                <Building2 className="w-4 h-4 text-blue-400" />
                {invoice.client?.companyName || invoice.client?.name}
              </div>
              <div className="text-xs text-slate-300">
                Attn: {invoice.client?.name}
              </div>
              <div className="text-xs text-slate-400">
                {invoice.client?.address ? `${invoice.client.address}, ` : ""}{invoice.client?.city}, {invoice.client?.country}
              </div>
            </div>

            <div className="text-left md:text-right text-xs text-slate-400 space-y-1 self-end">
              <div className="flex md:justify-end items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-500" />
                <span>{invoice.client?.email}</span>
              </div>
              <div className="flex md:justify-end items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-slate-500" />
                <span>{invoice.client?.phone}</span>
              </div>
              {invoice.client?.ifu && (
                <div>IFU Client : <span className="mono-font text-slate-300">{invoice.client.ifu}</span></div>
              )}
            </div>
          </div>

          {/* Line Items Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/[0.08] text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  <th className="pb-3 pl-2">Description</th>
                  <th className="pb-3 text-center">Quantité</th>
                  <th className="pb-3 text-right">Prix Unitaire (FCFA)</th>
                  <th className="pb-3 pr-2 text-right">Total HT (FCFA)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04] text-xs">
                {invoice.lineItems.map((item, idx) => (
                  <tr key={item.id || idx} className="hover:bg-white/[0.02]">
                    <td className="py-3.5 pl-2 font-medium text-slate-100">
                      {item.description}
                    </td>
                    <td className="py-3.5 text-center text-slate-300 tabular-nums">
                      {item.quantity}
                    </td>
                    <td className="py-3.5 text-right text-slate-300 tabular-nums">
                      {formatFCFA(item.unitPrice)}
                    </td>
                    <td className="py-3.5 pr-2 text-right font-bold text-white tabular-nums">
                      {formatFCFA(item.total)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Financial Summary & Totals */}
          <div className="flex flex-col md:flex-row justify-between gap-6 pt-4 border-t border-white/[0.08]">
            <div className="max-w-md space-y-3">
              {invoice.paymentMethod && (
                <div className="text-xs">
                  <span className="font-semibold text-slate-400 block mb-0.5">Mode de règlement :</span>
                  <span className="text-slate-200 font-medium">{invoice.paymentMethod}</span>
                </div>
              )}

              {invoice.notes && (
                <div className="text-xs bg-[#131926] p-3 rounded-2xl border border-white/[0.05]">
                  <span className="font-semibold text-slate-400 block mb-0.5">Notes & Modalités :</span>
                  <p className="text-slate-300 leading-relaxed">{invoice.notes}</p>
                </div>
              )}
            </div>

            <div className="w-full md:w-72 space-y-2 p-4 rounded-2xl bg-[#131926] border border-white/[0.06]">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Total HT</span>
                <span className="font-semibold text-slate-200 tabular-nums">
                  {formatFCFA(invoice.subtotal)}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>TVA ({invoice.vatRate}%)</span>
                <span className="font-semibold text-amber-400/90 tabular-nums">
                  {formatFCFA(invoice.vatAmount)}
                </span>
              </div>

              <div className="pt-2 border-t border-white/[0.08] flex items-center justify-between text-sm">
                <span className="font-bold text-white">Net à payer (TTC)</span>
                <span className="font-extrabold text-blue-400 text-lg tabular-nums">
                  {formatFCFA(invoice.total)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
