import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { invoicesRepo, companyRepo } from "@/lib/data";
import { formatFCFA, formatDateFr } from "@/lib/format";
import { ChevronLeft } from "lucide-react";
import { PrintButton } from "@/components/invoices/print-button";

export const revalidate = 0;

interface InvoicePdfPageProps {
  params: {
    id: string;
  };
}

export default async function InvoicePdfPage({ params }: InvoicePdfPageProps) {
  const invoice = await invoicesRepo.getById(params.id);
  const company = await companyRepo.getCompany();

  if (!invoice) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-900 py-8 print:py-0 print:bg-white print:text-black">
      {/* Top action controls (hidden when printing) */}
      <div className="max-w-4xl mx-auto mb-6 px-4 flex items-center justify-between print:hidden">
        <Link
          href={`/factures/${invoice.id}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Retour à la facture</span>
        </Link>

        <div className="flex items-center gap-3">
          <PrintButton />
        </div>
      </div>

      {/* Printable Sheet (A4 format layout) */}
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-8 sm:p-12 print:shadow-none print:p-0 print:rounded-none print:max-w-full print:m-0">
        {/* Header */}
        <div className="flex justify-between items-start border-b border-slate-200 pb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white font-black text-lg">
                J
              </div>
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                {company.name}
              </h1>
            </div>
            <p className="text-xs text-slate-600">{company.legalStatus} • {company.address}</p>
            <p className="text-xs text-slate-600">{company.city}, {company.country}</p>
            <p className="text-xs text-slate-600">Email : {company.email} | Tél : {company.phone}</p>
            {company.ifu && (
              <p className="text-xs font-medium text-slate-700 mt-1">
                N° IFU / RCCM : {company.ifu}
              </p>
            )}
          </div>

          <div className="text-right">
            <h2 className="text-3xl font-black text-blue-600 uppercase tracking-tight">
              FACTURE
            </h2>
            <p className="text-sm font-bold text-slate-900 font-mono mt-1">
              {invoice.invoiceNumber}
            </p>
            <div className="mt-4 text-xs text-slate-600 space-y-0.5">
              <p>Date d&apos;émission : <strong className="text-slate-900">{formatDateFr(invoice.issueDate)}</strong></p>
              <p>Date d&apos;échéance : <strong className="text-slate-900">{formatDateFr(invoice.dueDate)}</strong></p>
            </div>
          </div>
        </div>

        {/* Client & Billing Info */}
        <div className="grid grid-cols-2 gap-8 my-8 py-4 bg-slate-50 rounded-xl p-6 print:bg-slate-100/50">
          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Facturé à :
            </span>
            <p className="text-base font-bold text-slate-900">
              {invoice.client?.companyName || invoice.client?.name}
            </p>
            <p className="text-xs text-slate-600">Attn : {invoice.client?.name}</p>
            <p className="text-xs text-slate-600">{invoice.client?.address}</p>
            <p className="text-xs text-slate-600">{invoice.client?.city}, {invoice.client?.country}</p>
          </div>

          <div className="text-right space-y-1 text-xs text-slate-600 self-end">
            <p>Email : <strong className="text-slate-900">{invoice.client?.email}</strong></p>
            <p>Téléphone : <strong className="text-slate-900">{invoice.client?.phone}</strong></p>
            {invoice.client?.ifu && (
              <p>N° IFU : <strong className="text-slate-900">{invoice.client.ifu}</strong></p>
            )}
          </div>
        </div>

        {/* Table of items */}
        <table className="w-full text-left border-collapse my-6">
          <thead>
            <tr className="border-b-2 border-slate-900 text-xs font-bold text-slate-900 uppercase">
              <th className="py-3">Désignation des prestations</th>
              <th className="py-3 text-center">Quantité</th>
              <th className="py-3 text-right">Prix Unitaire (FCFA)</th>
              <th className="py-3 text-right">Montant HT (FCFA)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-xs text-slate-800">
            {invoice.lineItems.map((item, index) => (
              <tr key={item.id || index}>
                <td className="py-3 font-medium text-slate-900">
                  {item.description}
                </td>
                <td className="py-3 text-center tabular-nums">
                  {item.quantity}
                </td>
                <td className="py-3 text-right tabular-nums">
                  {formatFCFA(item.unitPrice)}
                </td>
                <td className="py-3 text-right font-bold text-slate-900 tabular-nums">
                  {formatFCFA(item.total)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals Section */}
        <div className="flex justify-between items-start pt-6 border-t border-slate-200">
          <div className="max-w-md text-xs text-slate-600 space-y-2">
            {invoice.paymentMethod && (
              <p>
                <strong className="text-slate-900">Mode de règlement :</strong> {invoice.paymentMethod}
              </p>
            )}
            {invoice.notes && (
              <div className="p-3 bg-slate-50 rounded-lg text-slate-700">
                <strong className="block text-slate-900 mb-1">Conditions de règlement :</strong>
                {invoice.notes}
              </div>
            )}
          </div>

          <div className="w-72 space-y-2 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Total Hors Taxes (HT) :</span>
              <span className="font-bold text-slate-900 tabular-nums">{formatFCFA(invoice.subtotal)}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>TVA ({invoice.vatRate}%) :</span>
              <span className="font-bold text-slate-900 tabular-nums">{formatFCFA(invoice.vatAmount)}</span>
            </div>
            <div className="flex justify-between text-base font-extrabold text-blue-600 pt-2 border-t-2 border-slate-900">
              <span>Total TTC (FCFA) :</span>
              <span className="tabular-nums">{formatFCFA(invoice.total)}</span>
            </div>
          </div>
        </div>

        {/* Legal footer */}
        <div className="mt-12 pt-6 border-t border-slate-200 text-center text-[10px] text-slate-500">
          <p>{company.name} — SARL au capital de 1 000 000 FCFA — IFU : {company.ifu || "32024098234891"}</p>
          <p className="mt-0.5">Facture établie conformément aux règles comptables OHADA & UEMOA.</p>
        </div>
      </div>
    </div>
  );
}
