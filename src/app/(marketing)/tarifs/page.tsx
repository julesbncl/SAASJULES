import React from "react";
import Link from "next/link";
import { Check, ArrowRight, Sparkles } from "lucide-react";
import { formatFCFA } from "@/lib/format";

export default function PricingPage() {
  const plans = [
    {
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
      cta: "Commencer l'essai",
      href: "/inscription",
    },
    {
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
      cta: "Essai gratuit 14 jours",
      href: "/inscription",
    },
    {
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
      cta: "Nous contacter",
      href: "/inscription",
    },
  ];

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
          Sans engagement. Réglez par Wave, Orange Money ou Carte Bancaire.
        </p>
      </div>

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

            <div className="pt-8">
              <Link
                href={plan.href}
                className={`w-full py-3 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  plan.popular
                    ? "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30 hover:scale-[1.02]"
                    : "bg-white/[0.06] hover:bg-white/[0.12] text-white"
                }`}
              >
                <span>{plan.cta}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
