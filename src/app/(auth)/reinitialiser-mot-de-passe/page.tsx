import React from "react";
import { Lock, ArrowRight } from "lucide-react";

export default function ResetPasswordPage() {
  return (
    <div className="rounded-3xl bg-[#0c101a]/95 backdrop-blur-xl p-8 border border-white/[0.08] shadow-2xl shadow-black/80 space-y-6">
      <div className="text-center space-y-1">
        <h1 className="text-2xl font-black text-white tracking-tight">
          Nouveau Mot de Passe
        </h1>
        <p className="text-xs text-slate-400">
          Choisissez un mot de passe robuste pour votre compte
        </p>
      </div>

      <form action="/connexion" className="space-y-4">
        <div>
          <label className="block text-[11px] font-semibold text-slate-300 mb-1.5">
            Nouveau Mot de Passe
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="password"
              required
              placeholder="••••••••••••"
              className="w-full pl-10 pr-3.5 py-2.5 text-xs bg-[#131926] border border-white/[0.08] rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-slate-300 mb-1.5">
            Confirmer le Mot de Passe
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="password"
              required
              placeholder="••••••••••••"
              className="w-full pl-10 pr-3.5 py-2.5 text-xs bg-[#131926] border border-white/[0.08] rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-xs font-bold shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2"
        >
          <span>Mettre à jour et se connecter</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
