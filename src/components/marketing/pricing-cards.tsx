"use client";

import React, { useState } from "react";
import { Check, ArrowRight, Loader2, CreditCard, ShieldCheck } from "lucide-react";
import { formatFCFA } from "@/lib/format";

export function PricingCards() {
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const plans = [
    {
      key: "starter",
      name: "Starter",
      description: "Pour freelances et consultants indépendants",
      price: 5000,
      period: "/ mois",
      popular: false,
      features: [
        "Jusqu'à 20 factures / mois",
        "Export PDF professionnel",
        "Calcul automatique TVA 18%",
        "Gestion jusqu'à 15 clients",
        "Support WhatsApp & Email",
      ],
      cta: "S'abonner en Starter",
    },
    {
      key: "pro",
      name: "Pro Entreprise",
      description: "Pour PME, agences et commerces en forte croissance",
      price: 15000,
      period: "/ mois",
      popular: true,
      features: [
        "Factures & Devis illimités",
        "Export PDF personnalisé avec Logo",
        "Relances automatiques par SMS / WhatsApp",
        "Multi-comptes bancaires & Mobile Money",
        "Export comptable OHADA",
        "Assistant IA & alertes trésorerie",
      ],
      cta: "Souscrire au Pack Pro",
    },
    {
      key: "enterprise",
      name: "Sur Mesure",
      description: "Pour grands comptes et réseaux de distribution",
      price: 45000,
      period: "/ mois",
      popular: false,
      features: [
        "Tout le pack Pro Entreprise",
        "Multi-utilisateurs & rôles d'équipe",
        "API d'intégration ERP / E-commerce",
        "Numérotation de factures personnalisée",
        "Gestionnaire de compte dédié",
      ],
      cta: "Souscrire Sur Mesure",
    },
  ];

  const handleCheckout = async (planKey: string) => {
    setLoadingPlan(planKey);
    setError(null);

    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planKey }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Impossible d'initialiser le paiement.");
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "Erreur lors de la redirection vers le paiement sécurisé."
      );
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <div className="space-y-6">
      {error && (
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs max-w-xl mx-auto text-center flex items-center justify-center gap-2">
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`rounded-3xl p-8 flex flex-col justify-between relative transition-all ${
              plan.popular
                ? "bg-gradient-to-b from-[#101a33] to-[#0c1222] border-2 border-blue-500 shadow-2xl shadow-blue-500/20 scale-105"
                : "bg-[#0c101a] border border-white/[0.08] hover:border-white/[0.15]"
            }`}
          >
            {plan.popular && (
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-blue-500 text-white text-[11px] font-bold uppercase tracking-wider shadow-md">
                Le plus populaire
              </span>
            )}

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                <p className="text-xs text-slate-400 mt-1">{plan.description}</p>
              </div>

              <div className="flex items-baseline gap-1">
                <span className="text-3xl lg:text-4xl font-extrabold text-white tabular-nums">
                  {formatFCFA(plan.price)}
                </span>
                <span className="text-xs text-slate-400">{plan.period}</span>
              </div>

              <ul className="space-y-3 pt-4 border-t border-white/[0.08] text-xs text-slate-300">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-8 space-y-2">
              <button
                type="button"
                disabled={loadingPlan !== null}
                onClick={() => handleCheckout(plan.key)}
                className={`w-full py-3 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-50 ${
                  plan.popular
                    ? "bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-lg shadow-blue-600/30 hover:scale-[1.02] active:scale-[0.98]"
                    : "bg-white/[0.06] hover:bg-white/[0.12] text-white"
                }`}
              >
                {loadingPlan === plan.key ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Redirection vers Stripe...</span>
                  </>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4" />
                    <span>{plan.cta}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Paiement sécurisé par Stripe & 3D Secure</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
