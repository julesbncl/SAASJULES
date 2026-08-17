import React from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { companyRepo } from "@/lib/data";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let companyName = "Apex Studio & Tech";
  try {
    const company = await companyRepo.getCompany();
    if (company?.name) {
      companyName = company.name;
    }
  } catch {
    // fallback
  }

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col lg:flex-row antialiased selection:bg-blue-500/30 selection:text-white">
      {/* Sidebar Navigation avec le vrai nom de l'entreprise connectée */}
      <Sidebar companyName={companyName} />

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-72 flex flex-col min-w-0 pt-14 lg:pt-0">
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
