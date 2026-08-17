import React from "react";
import { Topbar } from "@/components/layout/topbar";
import { companyRepo } from "@/lib/data";
import { CompanyForm } from "@/components/company/company-form";

export const revalidate = 0;

export default async function SettingsPage() {
  const company = await companyRepo.getCompany();

  return (
    <div className="min-h-full pb-16">
      <Topbar
        title="Paramètres de l'Entreprise"
        subtitle="Configurez les mentions légales, le taux de TVA UEMOA et vos coordonnées de règlement"
      />

      <div className="px-4 lg:px-8 py-6 space-y-6 max-w-5xl mx-auto">
        <CompanyForm initialCompany={company} />
      </div>
    </div>
  );
}
