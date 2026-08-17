"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Mail,
  Lock,
  User,
  Building2,
  Phone,
  ArrowRight,
  Loader2,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
  Sparkles,
  LogIn,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function RegisterPage() {
  const router = useRouter();
  const [companyName, setCompanyName] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Email confirmation state
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null);
  const [resending, setResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (password.length < 6) {
        throw new Error("Le mot de passe doit contenir au moins 6 caractères.");
      }

      const supabase = createClient();
      const redirectUrl =
        typeof window !== "undefined"
          ? `${window.location.origin}/auth/callback`
          : undefined;

      const { data, error: authError } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            full_name: fullName.trim(),
            company_name: companyName.trim(),
            phone: phone.trim(),
          },
        },
      });

      if (authError) {
        if (
          authError.message.includes("already registered") ||
          authError.message.includes("User already registered")
        ) {
          throw new Error(
            "Cette adresse email possède déjà un compte. Vous pouvez vous connecter directement."
          );
        }
        throw new Error(authError.message);
      }

      // If instant session (email confirmation turned off in Supabase)
      if (data.session) {
        router.push("/dashboard");
        router.refresh();
        return;
      }

      // If user is already created and confirmed
      if (data.user && data.user.identities && data.user.identities.length === 0) {
        throw new Error(
          "Cette adresse email possède déjà un compte. Vous pouvez vous connecter directement."
        );
      }

      // If email confirmation is required, show the confirmation screen
      setSubmittedEmail(email.trim());
      setCooldown(60); // 60s cooldown for Supabase rate limit
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "Une erreur est survenue lors de l'inscription"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResendEmail = async () => {
    if (!submittedEmail || cooldown > 0) return;
    setResending(true);
    setResendSuccess(null);
    setError(null);

    try {
      const supabase = createClient();
      const redirectUrl =
        typeof window !== "undefined"
          ? `${window.location.origin}/auth/callback`
          : undefined;

      const { error: resendError } = await supabase.auth.resend({
        type: "signup",
        email: submittedEmail,
        options: {
          emailRedirectTo: redirectUrl,
        },
      });

      if (resendError) {
        if (
          resendError.message.includes("already confirmed") ||
          resendError.message.includes("Email already confirmed")
        ) {
          setResendSuccess(
            "Votre adresse email est déjà validée ! Vous pouvez vous connecter directement."
          );
          return;
        }
        if (
          resendError.message.includes("security") ||
          resendError.message.includes("rate limit") ||
          resendError.message.includes("60 seconds")
        ) {
          setCooldown(60);
          throw new Error(
            "Un email a déjà été envoyé récemment. Veuillez patienter 60 secondes."
          );
        }
        throw new Error(resendError.message);
      }

      setResendSuccess(
        "Un nouvel email de confirmation vient d'être envoyé avec succès !"
      );
      setCooldown(60);
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Impossible de renvoyer l'email."
      );
    } finally {
      setResending(false);
    }
  };

  // Screen 2: Waiting for Email Verification
  if (submittedEmail) {
    return (
      <div className="rounded-3xl bg-[#0c101a]/95 backdrop-blur-xl p-8 border border-white/[0.08] shadow-2xl shadow-black/80 space-y-6 text-center">
        <div className="relative mx-auto w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 via-blue-500 to-cyan-400 flex items-center justify-center text-white shadow-xl shadow-blue-500/30">
          <Mail className="w-8 h-8 animate-pulse" />
          <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-[#0c101a] flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5 text-white" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-black text-white tracking-tight">
            Vérifiez votre boîte mail
          </h1>
          <p className="text-xs text-slate-300 leading-relaxed max-w-sm mx-auto">
            Nous venons d&apos;envoyer un lien d&apos;activation sécurisé à l&apos;adresse :
          </p>
          <div className="inline-block px-3.5 py-1.5 rounded-xl bg-[#131926] border border-white/[0.1] text-xs font-mono font-bold text-cyan-400">
            {submittedEmail}
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#131926]/90 border border-white/[0.06] text-left space-y-2 text-xs text-slate-300">
          <div className="flex items-center gap-2 font-semibold text-white">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>Que devez-vous faire ?</span>
          </div>
          <ol className="list-decimal list-inside space-y-1 text-slate-400 pl-1">
            <li>Ouvrez l&apos;email reçu de Supabase / JulesFactures.</li>
            <li>Cliquez sur le lien de confirmation sécurisé.</li>
            <li>Votre compte sera activé et vous accéderez à votre Dashboard.</li>
          </ol>
        </div>

        {resendSuccess && (
          <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <span>{resendSuccess}</span>
          </div>
        )}

        {error && (
          <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center justify-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="space-y-3 pt-2">
          <button
            type="button"
            disabled={resending || cooldown > 0}
            onClick={handleResendEmail}
            className="w-full py-2.5 rounded-2xl bg-white/[0.05] hover:bg-white/[0.08] border border-white/[0.08] text-slate-300 text-xs font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 ${resending ? "animate-spin" : ""}`}
            />
            <span>
              {resending
                ? "Envoi en cours..."
                : cooldown > 0
                ? `Renvoyer l'email (${cooldown}s)`
                : "Renvoyer l'email de confirmation"}
            </span>
          </button>

          <Link
            href="/connexion"
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-xs font-bold shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
          >
            <LogIn className="w-4 h-4" />
            <span>Se Connecter</span>
          </Link>
        </div>

        <div className="pt-2 text-[11px] text-slate-500">
          Pensez à vérifier vos courriers indésirables (Spams) si vous ne trouvez pas l&apos;email.
        </div>
      </div>
    );
  }

  // Screen 1: Registration Form
  return (
    <div className="rounded-3xl bg-[#0c101a]/95 backdrop-blur-xl p-8 border border-white/[0.08] shadow-2xl shadow-black/80 space-y-6">
      <div className="text-center space-y-1">
        <h1 className="text-2xl font-black text-white tracking-tight">
          Créer un Compte
        </h1>
        <p className="text-xs text-slate-400">
          Rejoignez des centaines d&apos;entrepreneurs qui gèrent leur facturation en FCFA
        </p>
      </div>

      {error && (
        <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-400" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label className="block text-[11px] font-semibold text-slate-300 mb-1.5">
            Nom de votre Entreprise / Activité
          </label>
          <div className="relative">
            <Building2 className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              required
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Ex: Apex Studio SARL, Dakar Tech..."
              className="w-full pl-10 pr-3.5 py-2.5 text-xs bg-[#131926] border border-white/[0.08] rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-[11px] font-semibold text-slate-300 mb-1.5">
              Votre Nom Complet
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Ex: Jules Diop"
                className="w-full pl-10 pr-3.5 py-2.5 text-xs bg-[#131926] border border-white/[0.08] rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-300 mb-1.5">
              Téléphone (Wave / OM)
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+221 77 000 00 00"
                className="w-full pl-10 pr-3.5 py-2.5 text-xs bg-[#131926] border border-white/[0.08] rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              />
            </div>
          </div>
        </div>

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
              placeholder="contact@votre-entreprise.com"
              className="w-full pl-10 pr-3.5 py-2.5 text-xs bg-[#131926] border border-white/[0.08] rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-slate-300 mb-1.5">
            Mot de Passe Sécurisé
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Au moins 6 caractères"
              className="w-full pl-10 pr-3.5 py-2.5 text-xs bg-[#131926] border border-white/[0.08] rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
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
              <span>Création du compte...</span>
            </>
          ) : (
            <>
              <span>Créer mon Compte & Démarrer</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      <div className="pt-4 border-t border-white/[0.06] text-center text-xs text-slate-400">
        Déjà un compte ?{" "}
        <Link
          href="/connexion"
          className="text-blue-400 hover:text-blue-300 font-bold"
        >
          Se connecter
        </Link>
      </div>
    </div>
  );
}
