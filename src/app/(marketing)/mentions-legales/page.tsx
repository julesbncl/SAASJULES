import React from "react";

export default function LegalPage() {
  return (
    <div className="py-16 px-6 lg:px-12 max-w-4xl mx-auto space-y-8 text-slate-300">
      <h1 className="text-3xl font-black text-white tracking-tight">
        Mentions Légales & Conformité
      </h1>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-white">1. Éditeur de la Plateforme</h2>
        <p className="text-xs leading-relaxed">
          Le service SaaS <strong>JulesFactures</strong> est édité par la société JulesFactures Technologies SARL, immatriculée au Registre du Commerce et du Crédit Mobilier sous le numéro SN-DKR-2026-B-12845, IFU : 32024098234891, dont le siège social est situé à Dakar, Sénégal.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-white">2. Conformité Fiscale UEMOA / OHADA</h2>
        <p className="text-xs leading-relaxed">
          Les factures générées via JulesFactures respectent les mentions obligatoires de l&apos;Acte Uniforme de l&apos;OHADA relatif au droit commercial général et au droit comptable. Le calcul de la TVA à 18% est conforme aux dispositions du Code Général des Impôts des pays de l&apos;UEMOA (Sénégal, Côte d&apos;Ivoire, Bénin, Togo, Mali, Burkina Faso, Niger, Guinée-Bissau).
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-white">3. Protection des Données Financières</h2>
        <p className="text-xs leading-relaxed">
          La sécurité et la confidentialité des données de facturation sont assurées par un chiffrement de bout en bout et une séparation stricte des environnements multi-tenants (Postgres Row Level Security).
        </p>
      </section>
    </div>
  );
}
