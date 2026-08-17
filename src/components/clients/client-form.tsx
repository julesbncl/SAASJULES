"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Client } from "@/lib/data/types";
import { clientsRepo } from "@/lib/data";
import {
  User,
  Building2,
  Mail,
  Phone,
  MapPin,
  FileCheck,
  Check,
  ChevronLeft,
} from "lucide-react";
import Link from "next/link";

interface ClientFormProps {
  initialData?: Client;
  isEdit?: boolean;
}

export function ClientForm({ initialData, isEdit = false }: ClientFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState(initialData?.name || "");
  const [companyName, setCompanyName] = useState(initialData?.companyName || "");
  const [email, setEmail] = useState(initialData?.email || "");
  const [phone, setPhone] = useState(initialData?.phone || "");
  const [address, setAddress] = useState(initialData?.address || "");
  const [city, setCity] = useState(initialData?.city || "Dakar");
  const [country, setCountry] = useState(initialData?.country || "Sénégal");
  const [ifu, setIfu] = useState(initialData?.ifu || "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (isEdit && initialData) {
        await clientsRepo.update(initialData.id, {
          name,
          companyName,
          email,
          phone,
          address,
          city,
          country,
          ifu,
        });
      } else {
        await clientsRepo.create({
          name,
          companyName,
          email,
          phone,
          address,
          city,
          country,
          ifu,
        });
      }

      router.push("/clients");
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue lors de l'enregistrement du client.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <Link
          href="/clients"
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Retour aux clients</span>
        </Link>

        <div className="flex items-center gap-3">
          <Link
            href="/clients"
            className="px-4 py-2 rounded-2xl bg-white/[0.05] hover:bg-white/[0.1] text-xs font-semibold text-slate-300 transition-all"
          >
            Annuler
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-xs font-bold shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
          >
            <Check className="w-4 h-4" />
            <span>{loading ? "Enregistrement..." : isEdit ? "Mettre à jour" : "Créer le client"}</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-medium">
          {error}
        </div>
      )}

      <div className="rounded-3xl bg-[#0c101a]/90 backdrop-blur-md p-6 lg:p-8 border border-white/[0.07] space-y-6">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <User className="w-4 h-4 text-blue-400" />
          Informations du Client
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 mb-1.5">
              Nom du Contact Principal *
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                placeholder="Ex: Mamadou Diop, Aïcha Koné..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2 text-xs bg-[#131926] border border-white/[0.08] rounded-xl text-white focus:outline-none focus:border-blue-500 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-400 mb-1.5">
              Raison Sociale / Entreprise
            </label>
            <div className="relative">
              <Building2 className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Ex: Sahel Logistics SARL, Ivoire Agri..."
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2 text-xs bg-[#131926] border border-white/[0.08] rounded-xl text-white focus:outline-none focus:border-blue-500 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-400 mb-1.5">
              Adresse Email *
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                placeholder="contact@client.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2 text-xs bg-[#131926] border border-white/[0.08] rounded-xl text-white focus:outline-none focus:border-blue-500 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-400 mb-1.5">
              Numéro de Téléphone *
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                placeholder="+221 77 000 00 00"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2 text-xs bg-[#131926] border border-white/[0.08] rounded-xl text-white focus:outline-none focus:border-blue-500 transition-all"
              />
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-[11px] font-semibold text-slate-400 mb-1.5">
              Adresse Physique
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Rue, Quartier, Numéro de lot..."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2 text-xs bg-[#131926] border border-white/[0.08] rounded-xl text-white focus:outline-none focus:border-blue-500 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-400 mb-1.5">
              Ville *
            </label>
            <input
              type="text"
              required
              placeholder="Dakar, Abidjan, Lomé, Cotonou..."
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
              placeholder="Sénégal, Côte d'Ivoire, Bénin, Togo..."
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full px-3.5 py-2 text-xs bg-[#131926] border border-white/[0.08] rounded-xl text-white focus:outline-none focus:border-blue-500 transition-all"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-[11px] font-semibold text-slate-400 mb-1.5">
              Numéro IFU / NINEA / RCCM (Fiscal)
            </label>
            <div className="relative">
              <FileCheck className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Identifiant fiscal unique du client pour les factures normalisées"
                value={ifu}
                onChange={(e) => setIfu(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2 text-xs bg-[#131926] border border-white/[0.08] rounded-xl text-white mono-font focus:outline-none focus:border-blue-500 transition-all"
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
