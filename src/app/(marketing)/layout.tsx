import React from "react";
import Link from "next/link";
import { Zap, ArrowRight } from "lucide-react";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#06080e] text-slate-100 flex flex-col justify-between">
      {/* Marketing Navbar */}
      <header className="sticky top-0 z-50 bg-[#06080e]/80 backdrop-blur-xl border-b border-white/[0.08] px-6 lg:px-12 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 via-blue-500 to-cyan-400 flex items-center justify-center text-white shadow-md shadow-blue-500/30">
              <Zap className="w-4 h-4 fill-white" />
            </div>
            <span className="font-extrabold text-lg text-white tracking-tight">
              Jules<span className="text-blue-400">Factures</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-slate-300">
            <Link href="/tarifs" className="hover:text-white transition-colors">
              Tarifs
            </Link>
            <Link href="/mentions-legales" className="hover:text-white transition-colors">
              Mentions Légales
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/connexion"
              className="text-xs font-semibold text-slate-300 hover:text-white px-3 py-2"
            >
              Connexion
            </Link>
            <Link
              href="/inscription"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Essai Gratuit</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Page Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Marketing Footer */}
      <footer className="border-t border-white/[0.08] bg-[#080b13] py-12 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
              <Zap className="w-3.5 h-3.5 fill-white" />
            </div>
            <span className="font-bold text-white">JulesFactures</span>
            <span>— Le SaaS de Facturation en FCFA</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/tarifs" className="hover:text-white">Tarifs</Link>
            <Link href="/mentions-legales" className="hover:text-white">Mentions Légales</Link>
            <Link href="/connexion" className="hover:text-white">Accès Espace Client</Link>
          </div>

          <div>
            © 2026 JulesFactures. Tous droits réservés.
          </div>
        </div>
      </footer>
    </div>
  );
}
