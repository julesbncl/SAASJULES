import React from "react";
import Link from "next/link";
import { Mail, ArrowRight, ChevronLeft } from "lucide-react";

export default function ForgotPasswordPage() {
  return (
    <div className="rounded-3xl bg-[#0c101a]/95 backdrop-blur-xl p-8 border border-white/[0.08] shadow-2xl shadow-black/80 space-y-6">
      <div className="text-center space-y-1">
        <h1 className="text-2xl font-black text-white tracking-tight">
          Mot de Passe Oublié
        </h1>
        <p className="text-xs text-slate-400">
          Entrez votre email pour recevoir le lien de réinitialisation
        </p>
      </div>

      <form action="/connexion" className="space-y-4">
        <div>
          <label className="block text-[11px] font-semibold text-slate-300 mb-1.5">
            Votre Adresse Email
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              required
              placeholder="contact@votre-entreprise.com"
              className="w-full pl-10 pr-3.5 py-2.5 text-xs bg-[#131926] border border-white/[0.08] rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-xs font-bold shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2"
        >
          <span>Envoyer les instructions</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      <div className="pt-4 border-t border-white/[0.06] text-center">
        <Link
          href="/connexion"
          className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-white font-medium transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Retour à la connexion</span>
        </Link>
      </div>
    </div>
  );
}
