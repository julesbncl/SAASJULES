"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Mail,
  Lock,
  ArrowRight,
  Loader2,
  AlertCircle,
  CheckCircle2,
  UserCheck,
  LogOut,
  LayoutDashboard,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const verified = searchParams.get("verified");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Active session detection
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [checkingSession, setCheckingSession] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    const checkCurrentAuth = async () => {
      try {
        const supabase = createClient();
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (session?.user) {
          setCurrentUser(session.user);
        }
      } catch {
        // ignore
      } finally {
        setCheckingSession(false);
      }
    };

    checkCurrentAuth();
  }, []);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
      setCurrentUser(null);
      setEmail("");
      setPassword("");
      router.refresh();
    } catch {
      // ignore
    } finally {
      setLoggingOut(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const supabase = createClient();
      const { error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (authError) {
        if (authError.message.includes("Invalid login credentials")) {
          throw new Error("Adresse email ou mot de passe incorrect.");
        }
        if (authError.message.includes("Email not confirmed")) {
          throw new Error(
            "Votre adresse email n'a pas encore été confirmée. Veuillez cliquer sur le lien reçu par email."
          );
        }
        throw new Error(authError.message);
      }

      router.push("/dashboard");
      router.refresh();
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "Une erreur est survenue lors de la connexion"
      );
    } finally {
      setLoading(false);
    }
  };

  if (checkingSession) {
    return (
      <div className="rounded-3xl bg-[#0c101a]/95 backdrop-blur-xl p-8 border border-white/[0.08] shadow-2xl shadow-black/80 flex items-center justify-center min-h-[300px]">
        <Loader2 className="w-6 h-6 animate-spin text-blue-400" />
      </div>
    );
  }

  // If already logged in, show options clearly instead of harsh automatic redirect
  if (currentUser) {
    return (
      <div className="rounded-3xl bg-[#0c101a]/95 backdrop-blur-xl p-8 border border-white/[0.08] shadow-2xl shadow-black/80 space-y-6 text-center">
        <div className="mx-auto w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-blue-600/30">
          <UserCheck className="w-7 h-7" />
        </div>

        <div className="space-y-1">
          <h1 className="text-xl font-bold text-white tracking-tight">
            Session Déjà Active
          </h1>
          <p className="text-xs text-slate-400">
            Vous êtes actuellement connecté avec l&apos;adresse :
          </p>
          <div className="inline-block px-3 py-1 rounded-xl bg-[#131926] border border-white/[0.1] text-xs font-mono font-bold text-cyan-400">
            {currentUser.email}
          </div>
        </div>

        <div className="space-y-3 pt-2">
          <Link
            href="/dashboard"
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-xs font-bold shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Accéder au Dashboard</span>
          </Link>

          <button
            type="button"
            disabled={loggingOut}
            onClick={handleLogout}
            className="w-full py-2.5 rounded-2xl bg-white/[0.05] hover:bg-rose-500/10 hover:border-rose-500/30 hover:text-rose-300 border border-white/[0.08] text-slate-300 text-xs font-semibold transition-all flex items-center justify-center gap-2"
          >
            {loggingOut ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <LogOut className="w-3.5 h-3.5" />
            )}
            <span>Se déconnecter pour changer de compte</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl bg-[#0c101a]/95 backdrop-blur-xl p-8 border border-white/[0.08] shadow-2xl shadow-black/80 space-y-6">
      <div className="text-center space-y-1">
        <h1 className="text-2xl font-black text-white tracking-tight">
          Connexion
        </h1>
        <p className="text-xs text-slate-400">
          Accédez à votre espace de gestion et facturation en FCFA
        </p>
      </div>

      {verified && (
        <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-400" />
          <span>Votre email a été vérifié avec succès ! Vous pouvez vous connecter.</span>
        </div>
      )}

      {error && (
        <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-400" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-[11px] font-semibold text-slate-300 mb-1.5">
            Adresse Email
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre.email@entreprise.com"
              className="w-full pl-10 pr-3.5 py-2.5 text-xs bg-[#131926] border border-white/[0.08] rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-[11px] font-semibold text-slate-300">
              Mot de Passe
            </label>
            <Link
              href="/mot-de-passe-oublie"
              className="text-[11px] text-blue-400 hover:text-blue-300 font-medium"
            >
              Mot de passe oublié ?
            </Link>
          </div>
          <div className="relative">
            <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full pl-10 pr-3.5 py-2.5 text-xs bg-[#131926] border border-white/[0.08] rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-all"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-xs font-bold shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Connexion en cours...</span>
            </>
          ) : (
            <>
              <span>Se Connecter</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      <div className="pt-4 border-t border-white/[0.06] text-center text-xs text-slate-400">
        Pas encore de compte ?{" "}
        <Link href="/inscription" className="text-blue-400 hover:text-blue-300 font-bold">
          Créer un compte entreprise
        </Link>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-slate-500">Chargement...</div>}>
      <LoginForm />
    </Suspense>
  );
}
