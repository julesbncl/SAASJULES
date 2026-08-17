"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Client, Invoice, InvoiceStatus } from "@/lib/data/types";
import { LineItemsEditor, LineItemState } from "./line-items-editor";
import {
  FileText,
  User,
  Calendar,
  CreditCard,
  Check,
  ChevronLeft,
  Building2,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { invoicesRepo } from "@/lib/data";

interface InvoiceFormProps {
  clients: Client[];
  initialData?: Invoice;
  isEdit?: boolean;
}

export function InvoiceForm({
  clients,
  initialData,
  isEdit = false,
}: InvoiceFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [clientId, setClientId] = useState(
    initialData?.clientId || (clients[0]?.id ?? "")
  );
  const [invoiceNumber, setInvoiceNumber] = useState(
    initialData?.invoiceNumber || `FAC-2026-${String(Math.floor(Math.random() * 900) + 100).padStart(4, "0")}`
  );
  const [issueDate, setIssueDate] = useState(
    initialData?.issueDate ? initialData.issueDate.split("T")[0] : new Date().toISOString().split("T")[0]
  );
  const [dueDate, setDueDate] = useState(
    initialData?.dueDate
      ? initialData.dueDate.split("T")[0]
      : new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]
  );
  const [status, setStatus] = useState<InvoiceStatus>(
    initialData?.status || "envoyee"
  );
  const [paymentMethod, setPaymentMethod] = useState(
    initialData?.paymentMethod || "Virement Bancaire"
  );
  const [notes, setNotes] = useState(
    initialData?.notes || "Règlement sous 15 jours à compter de la réception de la facture."
  );
  const [vatRate] = useState(initialData?.vatRate || 18);

  const [lineItems, setLineItems] = useState<LineItemState[]>(
    initialData?.lineItems?.map((li) => ({
      id: li.id,
      description: li.description,
      quantity: li.quantity,
      unitPrice: li.unitPrice,
    })) || [
      {
        id: `li_${Date.now()}`,
        description: "",
        quantity: 1,
        unitPrice: 0,
      },
    ]
  );

  const selectedClient = clients.find((c) => c.id === clientId);

  const handleSave = async (submitStatus: InvoiceStatus) => {
    setError(null);

    // Validate at least 1 item with description and price
    const validItems = lineItems.filter(
      (item) => item.description.trim() !== "" && item.quantity > 0
    );

    if (validItems.length === 0) {
      setError("Veuillez renseigner au moins une ligne de prestation avec description et quantité.");
      return;
    }

    setLoading(true);

    try {
      if (isEdit && initialData) {
        await invoicesRepo.update(initialData.id, {
          clientId,
          invoiceNumber,
          issueDate: new Date(issueDate).toISOString(),
          dueDate: new Date(dueDate).toISOString(),
          status: submitStatus,
          paymentMethod,
          notes,
          vatRate,
          lineItems: validItems.map((li) => ({
            id: li.id,
            invoiceId: initialData.id,
            description: li.description,
            quantity: li.quantity,
            unitPrice: li.unitPrice,
            total: Math.round(li.quantity * li.unitPrice),
          })),
        });
      } else {
        await invoicesRepo.create({
          invoiceNumber,
          clientId,
          companyId: "comp_01",
          issueDate: new Date(issueDate).toISOString(),
          dueDate: new Date(dueDate).toISOString(),
          status: submitStatus,
          paymentMethod,
          notes,
          vatRate,
          subtotal: 0, // Computed server-side
          vatAmount: 0, // Computed server-side
          total: 0, // Computed server-side
          lineItems: validItems.map((li) => ({
            id: li.id,
            invoiceId: "",
            description: li.description,
            quantity: li.quantity,
            unitPrice: li.unitPrice,
            total: Math.round(li.quantity * li.unitPrice),
          })),
        });
      }

      router.push("/factures");
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue lors de l'enregistrement.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSave(status);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-5xl mx-auto">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Link
          href="/factures"
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Retour aux factures</span>
        </Link>

        <div className="flex items-center gap-2.5">
          <Link
            href="/factures"
            className="px-4 py-2 rounded-2xl bg-white/[0.05] hover:bg-white/[0.1] text-xs font-semibold text-slate-300 transition-all"
          >
            Annuler
          </Link>
          <button
            type="button"
            disabled={loading}
            onClick={() => handleSave("brouillon")}
            className="px-4 py-2 rounded-2xl bg-[#131926] hover:bg-white/[0.08] text-xs font-semibold text-slate-200 border border-white/[0.08] transition-all disabled:opacity-50"
          >
            Sauvegarder brouillon
          </button>
          <button
            type="button"
            disabled={loading}
            onClick={() => handleSave("envoyee")}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-xs font-bold shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
          >
            <Check className="w-4 h-4" />
            <span>{loading ? "Enregistrement..." : isEdit ? "Enregistrer les modifications" : "Envoyer la facture"}</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-medium">
          {error}
        </div>
      )}

      {/* Grid: Invoice Meta Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Client Selection Card */}
        <div className="p-5 rounded-3xl bg-[#0c101a]/90 backdrop-blur-md border border-white/[0.07] space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-blue-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                Client Destinataire
              </h3>
            </div>
            <Link
              href="/clients/nouveau"
              className="text-xs text-blue-400 hover:text-blue-300 font-medium"
            >
              + Nouveau client
            </Link>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-400 mb-1.5">
              Sélectionner le client
            </label>
            <select
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 text-xs bg-[#131926] border border-white/[0.08] rounded-xl text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            >
              {clients.map((c) => (
                <option key={c.id} value={c.id} className="bg-[#131926] text-white">
                  {c.companyName ? `${c.companyName} (${c.name})` : c.name} — {c.city}, {c.country}
                </option>
              ))}
            </select>
          </div>

          {selectedClient && (
            <div className="p-3.5 rounded-2xl bg-[#141b2a] border border-white/[0.05] text-xs space-y-1.5">
              <div className="font-semibold text-slate-200 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-slate-400" />
                {selectedClient.companyName || selectedClient.name}
              </div>
              <div className="text-slate-400 text-[11px]">
                Email : {selectedClient.email} | Tél : {selectedClient.phone}
              </div>
              {selectedClient.ifu && (
                <div className="text-slate-400 text-[11px]">
                  IFU / RCCM : {selectedClient.ifu}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Invoice Parameters Card */}
        <div className="p-5 rounded-3xl bg-[#0c101a]/90 backdrop-blur-md border border-white/[0.07] space-y-4">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-blue-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              Paramètres de la Facture
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                Numéro de Facture
              </label>
              <input
                type="text"
                value={invoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)}
                required
                className="w-full px-3 py-2 text-xs bg-[#131926] border border-white/[0.08] rounded-xl text-white mono-font font-bold focus:outline-none focus:border-blue-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                Statut Initial
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as InvoiceStatus)}
                className="w-full px-3 py-2 text-xs bg-[#131926] border border-white/[0.08] rounded-xl text-white focus:outline-none focus:border-blue-500 transition-all"
              >
                <option value="envoyee">Envoyée</option>
                <option value="payee">Payée</option>
                <option value="brouillon">Brouillon</option>
                <option value="en_retard">En retard</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1 flex items-center gap-1">
                <Calendar className="w-3 h-3 text-slate-400" />
                Date d&apos;émission
              </label>
              <input
                type="date"
                value={issueDate}
                onChange={(e) => setIssueDate(e.target.value)}
                required
                className="w-full px-3 py-2 text-xs bg-[#131926] border border-white/[0.08] rounded-xl text-white focus:outline-none focus:border-blue-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1 flex items-center gap-1">
                <Calendar className="w-3 h-3 text-amber-400" />
                Date d&apos;échéance
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
                className="w-full px-3 py-2 text-xs bg-[#131926] border border-white/[0.08] rounded-xl text-white focus:outline-none focus:border-blue-500 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-400 mb-1 flex items-center gap-1">
              <CreditCard className="w-3 h-3 text-slate-400" />
              Mode de Règlement Souhaité
            </label>
            <input
              type="text"
              placeholder="Ex: Virement Bancaire (Ecobank), Wave Sénégal (+221...), Orange Money..."
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-[#131926] border border-white/[0.08] rounded-xl text-white focus:outline-none focus:border-blue-500 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Line Items Dynamic Editor */}
      <div className="p-6 rounded-3xl bg-[#0c101a]/90 backdrop-blur-md border border-white/[0.07]">
        <LineItemsEditor
          items={lineItems}
          onChange={setLineItems}
          vatRate={vatRate}
        />
      </div>

      {/* Notes & Legal mentions */}
      <div className="p-5 rounded-3xl bg-[#0c101a]/90 backdrop-blur-md border border-white/[0.07] space-y-2">
        <label className="block text-xs font-bold uppercase tracking-wider text-white">
          Notes, Coordonnées Bancaires & Conditions de Paiement
        </label>
        <textarea
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Coordonnées bancaires RIB/IBAN, pénalités de retard, conditions de livraison..."
          className="w-full p-3 text-xs bg-[#131926] border border-white/[0.08] rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-all"
        />
      </div>

      {/* Bottom Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-white/[0.06]">
        <button
          type="button"
          disabled={loading}
          onClick={() => handleSave("brouillon")}
          className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-[#131926] hover:bg-white/[0.08] text-xs font-semibold text-slate-200 border border-white/[0.08] transition-all disabled:opacity-50"
        >
          Sauvegarder comme brouillon
        </button>

        <button
          type="button"
          disabled={loading}
          onClick={() => handleSave("envoyee")}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-xs font-bold shadow-xl shadow-blue-600/30 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
        >
          <Sparkles className="w-4 h-4" />
          <span>{loading ? "Enregistrement en cours..." : isEdit ? "Enregistrer les modifications" : "Générer et envoyer la facture"}</span>
        </button>
      </div>
    </form>
  );
}
