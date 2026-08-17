import React from "react";
import { notFound } from "next/navigation";
import { Topbar } from "@/components/layout/topbar";
import { InvoiceForm } from "@/components/invoices/invoice-form";
import { invoicesRepo, clientsRepo } from "@/lib/data";

export const revalidate = 0;

interface EditInvoicePageProps {
  params: {
    id: string;
  };
}

export default async function EditInvoicePage({ params }: EditInvoicePageProps) {
  const invoice = await invoicesRepo.getById(params.id);
  const clients = await clientsRepo.getAll();

  if (!invoice) {
    notFound();
  }

  return (
    <div className="min-h-full pb-16">
      <Topbar
        title={`Modifier la Facture ${invoice.invoiceNumber}`}
        subtitle="Mettez à jour les articles, tarifs ou informations client"
      />

      <div className="px-4 lg:px-8 py-6 max-w-7xl mx-auto">
        <InvoiceForm clients={clients} initialData={invoice} isEdit={true} />
      </div>
    </div>
  );
}
