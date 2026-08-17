import React from "react";
import { notFound } from "next/navigation";
import { Topbar } from "@/components/layout/topbar";
import { ClientForm } from "@/components/clients/client-form";
import { clientsRepo } from "@/lib/data";

export const revalidate = 0;

interface EditClientPageProps {
  params: {
    id: string;
  };
}

export default async function EditClientPage({ params }: EditClientPageProps) {
  const client = await clientsRepo.getById(params.id);

  if (!client) {
    notFound();
  }

  return (
    <div className="min-h-full pb-16">
      <Topbar
        title={`Modifier ${client.name}`}
        subtitle="Mettez à jour les coordonnées et informations fiscales du client"
      />

      <div className="px-4 lg:px-8 py-6 max-w-7xl mx-auto">
        <ClientForm initialData={client} isEdit={true} />
      </div>
    </div>
  );
}
