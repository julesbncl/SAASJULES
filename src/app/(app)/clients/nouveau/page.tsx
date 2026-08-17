import React from "react";
import { Topbar } from "@/components/layout/topbar";
import { ClientForm } from "@/components/clients/client-form";

export default function NewClientPage() {
  return (
    <div className="min-h-full pb-16">
      <Topbar
        title="Ajouter un Client"
        subtitle="Créez un nouveau compte client pour vos futures facturations et devis"
      />

      <div className="px-4 lg:px-8 py-6 max-w-7xl mx-auto">
        <ClientForm />
      </div>
    </div>
  );
}
