"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Company } from "@/lib/data/types";
import { companyRepo } from "@/lib/data";
import { Percent, Save, Check, Loader2, AlertCircle } from "lucide-react";

interface CompanyFormProps {
  initialCompany: Company;
}

export function CompanyForm({ initialCompany }: CompanyFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState(initialCompany.name);
  const [legalStatus, setLegalStatus] = useState(initialCompany.legalStatus || "SARL");
  const [ifu, setIfu] = useState(initialCompany.ifu || "");
  const [vatRate, setVatRate] = useState(initialCompany.vatRate || 18);
  const [email, setEmail] = useState(initialCompany.email);
  const [phone, setPhone] = useState(initialCompany.phone);
  const [address, setAddress] = useState(initialCompany.address);
  const [city, setCity] = useState(initialCompany.city);
  const [country, setCountry] = useState(initialCompany.country);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await companyRepo.updateCompany({
        name,
        legalStatus,
        ifu,
        vatRate: Number(vatRate),
        email,
        phone,
        address,
        city,
        country,
      });

      setSuccess(true);
      router.refresh();
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erreur lors de la mise à jour des paramètres.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl bg-[#0c101a]/90 backdrop-blur-md p-6 lg:p-8 border border-white/[0.08] space-y-6 shadow-xl">
      <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
        <div>
          <h2 className="text-lg font-bold text-white tracking-tight">
            Profil de l&apos;Entreprise (Émetteur)
          </h2>
          <p className="text-xs text-slate-400">
            Ces informations apparaîtront sur l&apos;en-tête et le pied de toutes vos factures
          </p>
        </div>

        <span className="px-3 py-1 rounded-full bg-blue-500/15 text-blue-300 text-xs font-semibold border border-blue-400/25">
          Zone UEMOA / OHADA
        </span>
      </div>

      {error && (
        <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-400" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-center gap-2">
          <Check className="w-4 h-4 flex-shrink-0 text-emerald-400" />
          <span>Paramètres enregistrés avec succès dans Supabase !</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-[11px] font-semibold text-slate-400 mb-1.5">
            Raison Sociale de l&apos;Entreprise *
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3.5 py-2 text-xs bg-[#131926] border border-white/[0.08] rounded-xl text-white font-medium focus:outline-none focus:border-blue-500 transition-all"
          />
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-slate-400 mb-1.5">
            Forme Juridique
          </label>
          <input
            type="text"
            value={legalStatus}
            onChange={(e) => setLegalStatus(e.target.value)}
            placeholder="SARL, SAS, SUARL, Entreprise Individuelle..."
            className="w-full px-3.5 py-2 text-xs bg-[#131926] border border-white/[0.08] rounded-xl text-white focus:outline-none focus:border-blue-500 transition-all"
          />
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-slate-400 mb-1.5">
            Numéro IFU / NINEA / RCCM (Identifiant Fiscal)
          </label>
          <input
            type="text"
            value={ifu}
            onChange={(e) => setIfu(e.target.value)}
            placeholder="Ex: 0049281923-SN"
            className="w-full px-3.5 py-2 text-xs bg-[#131926] border border-white/[0.08] rounded-xl text-white mono-font focus:outline-none focus:border-blue-500 transition-all"
          />
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-slate-400 mb-1.5">
            Taux de TVA Standard (%)
          </label>
          <div className="relative">
            <input
              type="number"
              step="0.1"
              value={vatRate}
              onChange={(e) => setVatRate(Number(e.target.value))}
              className="w-full px-3.5 py-2 text-xs bg-[#131926] border border-white/[0.08] rounded-xl text-white tabular-nums focus:outline-none focus:border-blue-500 transition-all"
            />
            <Percent className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-slate-400 mb-1.5">
            Email Professionnel *
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3.5 py-2 text-xs bg-[#131926] border border-white/[0.08] rounded-xl text-white focus:outline-none focus:border-blue-500 transition-all"
          />
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-slate-400 mb-1.5">
            Numéro de Téléphone Professionnel *
          </label>
          <input
            type="text"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-3.5 py-2 text-xs bg-[#131926] border border-white/[0.08] rounded-xl text-white focus:outline-none focus:border-blue-500 transition-all"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-[11px] font-semibold text-slate-400 mb-1.5">
            Adresse Siège Social *
          </label>
          <input
            type="text"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-3.5 py-2 text-xs bg-[#131926] border border-white/[0.08] rounded-xl text-white focus:outline-none focus:border-blue-500 transition-all"
          />
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-slate-400 mb-1.5">
            Ville *
          </label>
          <input
            type="text"
            required
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full px-3.5 py-2 text-xs bg-[#131926] border border-white/[0.08] rounded-xl text-white focus:outline-none focus:border-blue-500 transition-all"
          />
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-slate-400 mb-1.5">
            Pays *
          </label>
          <input
            type="text"
            required
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full px-3.5 py-2 text-xs bg-[#131926] border border-white/[0.08] rounded-xl text-white focus:outline-none focus:border-blue-500 transition-all"
          />
        </div>
      </div>

      <div className="pt-4 border-t border-white/[0.06] flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-xs font-bold shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Enregistrement...</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Enregistrer les paramètres</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
