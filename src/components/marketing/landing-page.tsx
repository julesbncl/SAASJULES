import React from "react";
import Link from "next/link";
import {
  Zap,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  FileText,
  Percent,
  Clock,
  Users,
  Smartphone,
  Check,
  TrendingUp,
} from "lucide-react";
import { formatFCFA } from "@/lib/format";

export function LandingPageComponent() {
  const problems = [
    {
      icon: FileText,
      title: "Factures artisanales sur Word",
      description: "Modèles Word ou Excel désordonnés qui nuisent à votre crédibilité auprès des clients corporate et grands comptes.",
      tag: "Perte d'image",
    },
    {
      icon: Percent,
      title: "Calculs manuels de TVA 18%",
      description: "Erreurs d'arrondis en FCFA, oubli des taux légaux UEMOA et angoisse au moment de faire la déclaration fiscale.",
      tag: "Risque fiscal",
    },
    {
      icon: Clock,
      title: "Suivi des paiements chaotique",
      description: "Factures oubliées, clients qui dépassent l'échéance sans relance et visibilité floue sur votre vraie trésorerie.",
      tag: "Trésorerie ralentie",
    },
  ];

  const features = [
    {
      icon: FileText,
      badge: "2 Clics",
      title: "Factures Pro Instantanées",
      description: "Générez des factures et devis au design irréprochable avec votre logo, numéro IFU/RCCM et vos mentions légales UEMOA.",
      metric: "Export PDF HD",
    },
    {
      icon: Percent,
      badge: "UEMOA",
      title: "TVA 18% & Net à Payer",
      description: "Tous les calculs HT, TVA 18% et TTC sont calculés et arrondis en nombres entiers FCFA sans risque d'erreur humaine.",
      metric: "100% Conforme",
    },
    {
      icon: Smartphone,
      badge: "Mobile Money",
      title: "Suivi des Règlements en Direct",
      description: "Indiquez vos comptes Wave, Orange Money ou RIB bancaire. Sachez à tout instant qui a payé et qui est en retard.",
      metric: "Wave / OM / Bank",
    },
    {
      icon: Users,
      badge: "CRM Intégré",
      title: "Répertoire Clients Centralisé",
      description: "Conservez l'historique complet de facturation, les coordonnées et les numéros IFU de chacun de vos clients.",
      metric: "Historique à vie",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Inscris-toi en 30 secondes",
      description: "Crée ton compte et renseigne les informations de ton entreprise (nom, logo, IFU/NINEA).",
    },
    {
      number: "02",
      title: "Crée ta première facture",
      description: "Sélectionne ton client, ajoute tes prestations et les totaux en FCFA se calculent en temps réel.",
    },
    {
      number: "03",
      title: "Envoie et encaisse plus vite",
      description: "Partage le PDF professionnel par WhatsApp ou email et suis le statut d'encaissement en 1 coup d'œil.",
    },
  ];

  const testimonials = [
    {
      name: "Cheikh Ndiaye",
      role: "Directeur d'Agence Digitale",
      location: "Dakar, Sénégal",
      avatar: "CN",
      comment: "Depuis qu'on envoie nos factures générées avec JulesFactures, les clients nous paient en moyenne 10 jours plus vite. Les coordonnées Wave et RIB bien présentées font toute la différence.",
    },
    {
      name: "Awa Traoré",
      role: "Consultante RH & Formation",
      location: "Abidjan, Côte d'Ivoire",
      avatar: "AT",
      comment: "Le calcul automatique de la TVA à 18% et l'export comptable en FCFA m'ont sauvé des heures de prise de tête chaque fin de mois. Simple, élégant et fiable.",
    },
    {
      name: "Jean-Yves Kouassi",
      role: "Gérant PME Logistique",
      location: "Cotonou, Bénin",
      avatar: "JK",
      comment: "L'interface est juste sublime. Tout est clair : le taux de recouvrement, les factures en retard et l'historique des clients. C'est l'outil indispensable pour les PME d'ici.",
    },
  ];

  const pricingPlans = [
    {
      name: "Gratuit",
      price: 0,
      period: "/ toujours",
      desc: "Idéal pour débuter votre activité d'indépendant",
      popular: false,
      features: [
        "Jusqu'à 5 factures / mois",
        "Calcul automatique TVA 18%",
        "Export PDF avec filigrane",
        "1 utilisateur",
        "Support par email",
      ],
      cta: "Commencer gratuitement",
      href: "/inscription",
    },
    {
      name: "Pro",
      price: 5000,
      period: "/ mois",
      desc: "Pour les freelances, agences et entrepreneurs actifs",
      popular: true,
      features: [
        "Factures & Devis illimités",
        "Export PDF personnalisé avec Logo",
        "Calcul automatique TVA 18% & FCFA",
        "Gestion clients illimitée",
        "Comptes Wave, OM & Banques",
        "Relances clients en 1 clic",
        "Support WhatsApp prioritaire",
      ],
      cta: "Essai gratuit 14 jours",
      href: "/inscription",
    },
    {
      name: "Business",
      price: 15000,
      period: "/ mois",
      desc: "Pour les PME et équipes en forte croissance",
      popular: false,
      features: [
        "Tout le plan Pro",
        "Multi-utilisateurs & gestion d'équipe",
        "Export journal des ventes pour comptable",
        "Alertes de trésorerie intelligentes",
        "Multi-devises (FCFA, EUR, USD)",
        "Gestionnaire de compte dédié",
      ],
      cta: "Choisir le plan Business",
      href: "/inscription",
    },
  ];

  return (
    <div className="space-y-24 lg:space-y-32 pb-24 overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 lg:pt-20 px-6 lg:px-12 max-w-7xl mx-auto">
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-600/15 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="text-center space-y-6 max-w-4xl mx-auto relative z-10">
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#131926] border border-blue-500/25 text-blue-400 text-xs font-semibold shadow-lg shadow-blue-500/10 animate-in fade-in slide-in-from-bottom-2">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Le SaaS de facturation n°1 en Afrique de l&apos;Ouest (Zone UEMOA)</span>
          </div>

          {/* Main Hero Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white tracking-tight leading-[1.1]">
            Fini les factures artisanales sur{" "}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              Word &amp; Excel.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            Créez des factures professionnelles en <strong className="text-white">FCFA</strong> en 2 clics, calculez la <strong className="text-white">TVA 18%</strong> automatiquement et encaissez plus vite par <strong className="text-cyan-400">Wave</strong>, <strong className="text-amber-400">Orange Money</strong> ou Virement.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/inscription"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-sm font-extrabold shadow-xl shadow-blue-600/35 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Commencer gratuitement</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/dashboard"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-[#131926] hover:bg-white/[0.08] text-white text-sm font-semibold border border-white/[0.1] transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Zap className="w-4 h-4 text-blue-400" />
              <span>Voir la démo du Dashboard</span>
            </Link>
          </div>

          {/* Trust points */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Sans carte bancaire</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Conforme OHADA &amp; IFU</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Devise FCFA native</span>
            </div>
          </div>
        </div>

        {/* Dashboard Mockup Showcase */}
        <div className="mt-12 lg:mt-16 relative">
          <div className="rounded-3xl p-2 bg-gradient-to-b from-white/[0.15] to-transparent border border-white/[0.1] shadow-2xl shadow-black/80">
            <div className="rounded-[22px] bg-[#0c101a] border border-white/[0.08] p-4 sm:p-6 lg:p-8 space-y-6 overflow-hidden">
              {/* Mockup Topbar */}
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="text-xs text-slate-500 font-mono ml-2">app.julesfactures.com/dashboard</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[11px] font-semibold text-emerald-400 uppercase">Synchronisé</span>
                </div>
              </div>

              {/* Mockup Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-[#131926] border border-white/[0.06]">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Total Facturé (Mars 2026)</span>
                  <div className="text-xl lg:text-2xl font-extrabold text-white tabular-nums">
                    {formatFCFA(31300000)}
                  </div>
                  <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3" /> +18% vs mois dernier
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-[#131926] border border-white/[0.06]">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Total Encaissé</span>
                  <div className="text-xl lg:text-2xl font-extrabold text-emerald-400 tabular-nums">
                    {formatFCFA(29500000)}
                  </div>
                  <span className="text-[11px] text-slate-400 font-medium mt-1 block">
                    Taux de recouvrement : 94%
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-[#131926] border border-white/[0.06]">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Moyen Préféré</span>
                  <div className="text-sm font-bold text-white flex items-center gap-2 mt-1">
                    <div className="w-6 h-6 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-xs">W</div>
                    <span>Wave Sénégal &amp; CI</span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono mt-1 block">Règlement instantané</span>
                </div>
              </div>

              {/* Mockup Recent Invoices Mini Table */}
              <div className="p-4 rounded-2xl bg-[#101624] border border-white/[0.05] space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-bold text-white uppercase text-[10px] tracking-wider">Factures Récentes</span>
                  <span>44 factures émises</span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="font-mono font-bold text-blue-400">FAC-2026-0044</span>
                      <span className="font-medium text-white">Sahel Logistics SARL</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-extrabold text-white tabular-nums">{formatFCFA(2950000)}</span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold">Payée (Wave)</span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="font-mono font-bold text-blue-400">FAC-2026-0043</span>
                      <span className="font-medium text-white">Ivoire Green Agri</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-extrabold text-white tabular-nums">{formatFCFA(1450000)}</span>
                      <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] font-bold">Envoyée</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SECTION PROBLÈMES */}
      <section className="px-6 lg:px-12 max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-bold text-rose-400 uppercase tracking-widest">Le constat</span>
          <h2 className="text-3xl lg:text-5xl font-extrabold text-white tracking-tight">
            Pourquoi les méthodes actuelles freinent votre croissance
          </h2>
          <p className="text-sm text-slate-400">
            Perdre du temps sur des outils inadaptés coûte cher à votre entreprise.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {problems.map((prob) => {
            const Icon = prob.icon;
            return (
              <div
                key={prob.title}
                className="p-8 rounded-3xl bg-[#0c101a] border border-white/[0.07] space-y-4 hover:border-rose-500/30 transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] uppercase font-bold text-rose-400/80 px-2 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/20">
                    {prob.tag}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-rose-300 transition-colors">
                  {prob.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {prob.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. SECTION FONCTIONNALITÉS */}
      <section className="px-6 lg:px-12 max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">Fonctionnalités Clés</span>
          <h2 className="text-3xl lg:text-5xl font-extrabold text-white tracking-tight">
            Tout ce dont vous avez besoin pour facturer comme un pro
          </h2>
          <p className="text-sm text-slate-400">
            Une expérience pensée de A à Z pour le marché ouest-africain.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                className="p-8 rounded-3xl bg-[#0c101a] border border-white/[0.07] space-y-4 hover:border-blue-500/30 transition-all hover:shadow-xl hover:shadow-blue-900/10 group"
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold text-cyan-400 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">
                    {feat.badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                  {feat.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {feat.description}
                </p>

                <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-slate-300">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>{feat.metric}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. SECTION COMMENT ÇA MARCHE */}
      <section className="px-6 lg:px-12 max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">Simplicité absolue</span>
          <h2 className="text-3xl lg:text-5xl font-extrabold text-white tracking-tight">
            Comment ça marche en 3 étapes
          </h2>
          <p className="text-sm text-slate-400">
            Commencez à émettre vos factures en moins de 3 minutes chrono.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div
              key={step.number}
              className="p-8 rounded-3xl bg-[#0c101a] border border-white/[0.07] space-y-4 relative"
            >
              <div className="text-4xl font-black bg-gradient-to-tr from-blue-500 to-cyan-400 bg-clip-text text-transparent mono-font">
                {step.number}
              </div>
              <h3 className="text-lg font-bold text-white">
                {step.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. SECTION TÉMOIGNAGES */}
      <section className="px-6 lg:px-12 max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Témoignages</span>
          <h2 className="text-3xl lg:text-5xl font-extrabold text-white tracking-tight">
            Adopté par les entrepreneurs qui avancent
          </h2>
          <p className="text-sm text-slate-400">
            Découvrez comment ils ont professionnalisé leur gestion financière.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="p-8 rounded-3xl bg-[#0c101a] border border-white/[0.07] space-y-6 flex flex-col justify-between"
            >
              <p className="text-xs text-slate-300 leading-relaxed italic">
                &ldquo;{t.comment}&rdquo;
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06]">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-extrabold text-xs shadow-md">
                  {t.avatar}
                </div>
                <div>
                  <div className="font-bold text-xs text-white">{t.name}</div>
                  <div className="text-[11px] text-slate-400">{t.role}</div>
                  <div className="text-[10px] text-cyan-400 font-medium">{t.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. SECTION TARIFICATION */}
      <section className="px-6 lg:px-12 max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">Tarification Transparente</span>
          <h2 className="text-3xl lg:text-5xl font-extrabold text-white tracking-tight">
            Des forfaits pensés pour votre réalité
          </h2>
          <p className="text-sm text-slate-400">
            Tarifs clairs en FCFA. Sans engagement. Paiement par Wave, Orange Money ou Carte.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-3xl p-8 flex flex-col justify-between relative transition-all ${
                plan.popular
                  ? "bg-gradient-to-b from-[#101a33] to-[#0c1222] border-2 border-blue-500 shadow-2xl shadow-blue-500/20 scale-105"
                  : "bg-[#0c101a] border border-white/[0.08] hover:border-white/[0.15]"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-blue-500 text-white text-[10px] font-extrabold uppercase tracking-wider shadow-md">
                  Recommandé
                </span>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                  <p className="text-xs text-slate-400 mt-1">{plan.desc}</p>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="text-3xl lg:text-4xl font-black text-white tabular-nums">
                    {plan.price === 0 ? "0 FCFA" : formatFCFA(plan.price)}
                  </span>
                  <span className="text-xs text-slate-400">{plan.period}</span>
                </div>

                <ul className="space-y-3 pt-4 border-t border-white/[0.08] text-xs text-slate-300">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8">
                <Link
                  href={plan.href}
                  className={`w-full py-3 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                    plan.popular
                      ? "bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-lg shadow-blue-600/30 hover:scale-[1.02]"
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
      </section>

      {/* 7. SECTION CTA FINAL */}
      <section className="px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="rounded-3xl p-8 lg:p-16 bg-gradient-to-tr from-blue-950 via-[#0e172e] to-[#0a0f1d] border border-blue-500/30 text-center space-y-6 relative overflow-hidden shadow-2xl">
          <div className="absolute -top-24 -right-24 w-60 h-60 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

          <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-bold uppercase tracking-wider inline-block">
            Rejoignez la nouvelle génération
          </span>

          <h2 className="text-3xl lg:text-5xl font-black text-white tracking-tight max-w-2xl mx-auto">
            Rejoins les entrepreneurs qui facturent comme des pros.
          </h2>

          <p className="text-sm text-slate-300 max-w-xl mx-auto font-normal">
            Créez votre première facture en moins de 2 minutes et offrez à votre entreprise l&apos;image qu&apos;elle mérite.
          </p>

          <div className="pt-2 flex justify-center">
            <Link
              href="/inscription"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-sm font-extrabold shadow-xl shadow-blue-600/40 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Commencer gratuitement maintenant</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
