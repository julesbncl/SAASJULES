import React from "react";
import { Topbar } from "@/components/layout/topbar";
import { InvoiceForm } from "@/components/invoices/invoice-form";
import { clientsRepo } from "@/lib/data";

export const revalidate = 0;

export default async function NewInvoicePage() {
  const clients = await clientsRepo.getAll();

  return (
    <div className="min-h-full pb-16">
      <Topbar
        title="Créer une Facture"
        subtitle="Émettez une nouvelle facture avec calcul automatique de la TVA en FCFA"
      />

      <div className="px-4 lg:px-8 py-6 max-w-7xl mx-auto">
        <InvoiceForm clients={clients} />
      </div>
    </div>
  );
}
