"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Invoice, InvoiceStatus } from "@/lib/data/types";
import { invoicesRepo } from "@/lib/data";
import {
  Edit,
  Download,
  Trash2,
  CheckCircle2,
  Clock,
  AlertTriangle,
  FileText,
  ChevronDown,
  AlertOctagon,
  X,
  Check,
} from "lucide-react";

interface InvoiceActionsProps {
  invoice: Invoice;
}

export function InvoiceActions({ invoice }: InvoiceActionsProps) {
  const router = useRouter();
  const [currentStatus, setCurrentStatus] = useState<InvoiceStatus>(invoice.status);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showStatusMenu, setShowStatusMenu] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleStatusChange = async (newStatus: InvoiceStatus) => {
    setIsUpdating(true);
    setShowStatusMenu(false);
    try {
      await invoicesRepo.update(invoice.id, { status: newStatus });
      setCurrentStatus(newStatus);
      router.refresh();
    } catch (err) {
      console.error("Erreur mise à jour statut:", err);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await invoicesRepo.delete(invoice.id);
      router.push("/factures");
      router.refresh();
    } catch (err) {
      console.error("Erreur suppression facture:", err);
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className="flex flex-wrap items-center gap-2">
        {/* Status Change Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowStatusMenu(!showStatusMenu)}
            disabled={isUpdating}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-[#131926] hover:bg-white/[0.08] text-slate-200 text-xs font-semibold border border-white/[0.08] transition-all disabled:opacity-50"
          >
            <span>Statut :</span>
            <span className="font-bold text-white capitalize">
              {currentStatus === "payee"
                ? "Payée"
                : currentStatus === "envoyee"
                ? "Envoyée"
                : currentStatus === "en_retard"
                ? "En retard"
                : "Brouillon"}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {showStatusMenu && (
            <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-[#0e1422] border border-white/[0.1] shadow-2xl z-30 p-1.5 space-y-1">
              <button
                type="button"
                onClick={() => handleStatusChange("payee")}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-left text-emerald-400 hover:bg-emerald-500/10 transition-colors font-medium"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Marquer comme Payée</span>
              </button>

              <button
                type="button"
                onClick={() => handleStatusChange("envoyee")}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-left text-amber-400 hover:bg-amber-500/10 transition-colors font-medium"
              >
                <Clock className="w-4 h-4 text-amber-400" />
                <span>Marquer comme Envoyée</span>
              </button>

              <button
                type="button"
                onClick={() => handleStatusChange("en_retard")}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-left text-rose-400 hover:bg-rose-500/10 transition-colors font-medium"
              >
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                <span>Marquer En retard</span>
              </button>

              <button
                type="button"
                onClick={() => handleStatusChange("brouillon")}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-left text-slate-400 hover:bg-white/[0.05] transition-colors font-medium"
              >
                <FileText className="w-4 h-4 text-slate-400" />
                <span>Passer en Brouillon</span>
              </button>
            </div>
          )}
        </div>

        {/* Edit Button */}
        <Link
          href={`/factures/${invoice.id}/modifier`}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 hover:text-white text-xs font-semibold border border-white/[0.08] transition-all"
        >
          <Edit className="w-3.5 h-3.5" />
          <span>Modifier</span>
        </Link>

        {/* Print / PDF Button */}
        <Link
          href={`/factures/${invoice.id}/pdf`}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Imprimer / PDF</span>
        </Link>

        {/* Delete Button */}
        <button
          type="button"
          onClick={() => setShowDeleteModal(true)}
          className="p-2 rounded-2xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 transition-all"
          title="Supprimer la facture"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="rounded-3xl bg-[#0c101a] border border-white/[0.1] p-6 max-w-md w-full shadow-2xl space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
                <AlertOctagon className="w-5 h-5" />
              </div>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2">
              <h3 className="text-base font-bold text-white">
                Supprimer la facture {invoice.invoiceNumber} ?
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Cette action est irréversible. Toutes les lignes de prestations et l&apos;historique de cette facture seront définitivement supprimés.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                disabled={isDeleting}
                className="px-4 py-2 rounded-2xl bg-white/[0.05] hover:bg-white/[0.1] text-xs font-semibold text-slate-300 transition-all"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={isDeleting}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-lg shadow-rose-600/30 transition-all disabled:opacity-50"
              >
                <Check className="w-4 h-4" />
                <span>{isDeleting ? "Suppression..." : "Confirmer la suppression"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
