"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Client } from "@/lib/data/types";
import { clientsRepo } from "@/lib/data";
import {
  Edit,
  Trash2,
  AlertOctagon,
  X,
  Check,
  Plus,
} from "lucide-react";

interface ClientActionsProps {
  client: Client;
}

export function ClientActions({ client }: ClientActionsProps) {
  const router = useRouter();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await clientsRepo.delete(client.id);
      router.push("/clients");
      router.refresh();
    } catch (err) {
      console.error("Erreur suppression client:", err);
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className="flex items-center gap-2.5">
        <Link
          href={`/clients/${client.id}/modifier`}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 hover:text-white text-xs font-semibold border border-white/[0.08] transition-all"
        >
          <Edit className="w-3.5 h-3.5" />
          <span>Modifier</span>
        </Link>

        <Link
          href="/factures/nouvelle"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Nouvelle Facture</span>
        </Link>

        <button
          type="button"
          onClick={() => setShowDeleteModal(true)}
          className="p-2 rounded-2xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 transition-all"
          title="Supprimer le client"
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
                Supprimer le client {client.companyName || client.name} ?
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Cette action retirera ce client de votre répertoire. Les factures déjà émises conserveront leurs informations historiques.
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
