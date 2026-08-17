import React from "react";
import { Sparkles } from "lucide-react";
import { PricingCards } from "@/components/marketing/pricing-cards";

export default function PricingPage() {
  return (
    <div className="py-16 px-6 lg:px-12 max-w-7xl mx-auto space-y-12">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Tarifs 100% transparents en FCFA</span>
        </div>
        <h1 className="text-3xl lg:text-5xl font-black text-white tracking-tight">
          Des formules adaptées aux entrepreneurs d&apos;Afrique de l&apos;Ouest
        </h1>
        <p className="text-sm text-slate-400">
          Sans engagement. Réglez en ligne par Carte Bancaire sécurisée (Stripe), Wave ou Mobile Money.
        </p>
      </div>

      <PricingCards />
    </div>
  );
}
