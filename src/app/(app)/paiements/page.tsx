import React from "react";
import { Topbar } from "@/components/layout/topbar";
import { Smartphone } from "lucide-react";

export const revalidate = 0;

export default function PaymentsPage() {
  const paymentMethods = [
    {
      name: "Wave Sénégal / CI",
      type: "Mobile Money",
      details: "+221 77 845 20 10",
      active: true,
      color: "from-sky-500 to-blue-600",
    },
    {
      name: "Orange Money",
      type: "Mobile Money",
      details: "+221 77 123 45 67",
      active: true,
      color: "from-amber-500 to-orange-600",
    },
    {
      name: "Virement Bancaire (Coris Bank)",
      type: "Bancaire",
      details: "SN08 0100 1529 0001 2345 6789",
      active: true,
      color: "from-emerald-500 to-teal-700",
    },
  ];

  return (
    <div className="min-h-full pb-16">
      <Topbar
        title="Paiements & Encaissements"
        subtitle="Moyens de paiement configurés pour vos clients et suivi des règlements"
      />

      <div className="px-4 lg:px-8 py-6 space-y-6 max-w-7xl mx-auto">
        <h2 className="text-xl font-bold text-white tracking-tight">
          Comptes de Réception Actifs
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {paymentMethods.map((method) => (
            <div
              key={method.name}
              className="rounded-3xl bg-[#0c101a]/90 backdrop-blur-md p-6 border border-white/[0.07] space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-xl bg-gradient-to-tr ${method.color} flex items-center justify-center text-white font-bold`}>
                    <Smartphone className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xs text-white">{method.name}</h3>
                    <span className="text-[11px] text-slate-400">{method.type}</span>
                  </div>
                </div>
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400" />
              </div>

              <div className="p-3 rounded-2xl bg-[#131926] text-xs font-mono text-slate-200">
                {method.details}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
