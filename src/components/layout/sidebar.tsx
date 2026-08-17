"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Users,
  CreditCard,
  BarChart3,
  Settings,
  Sparkles,
  Zap,
  Menu,
  X,
  ChevronRight,
  FileCheck2,
  LogOut,
  LogIn,
  UserPlus,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";

interface SidebarProps {
  companyName?: string;
}

export function Sidebar({ companyName = "Apex Studio SARL" }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
      router.push("/connexion");
      router.refresh();
    } catch (err) {
      console.error("Erreur lors de la déconnexion:", err);
    } finally {
      setLoggingOut(false);
    }
  };

  const navigation = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
      badge: undefined,
    },
    {
      name: "Factures",
      href: "/factures",
      icon: FileText,
      badge: undefined,
    },
    {
      name: "Clients",
      href: "/clients",
      icon: Users,
      badge: undefined,
    },
    {
      name: "Devis & Proformas",
      href: "/devis",
      icon: FileCheck2,
      badge: undefined,
    },
    {
      name: "Paiements",
      href: "/paiements",
      icon: CreditCard,
      badge: undefined,
    },
    {
      name: "Rapports & Stats",
      href: "/rapports",
      icon: BarChart3,
      badge: undefined,
    },
    {
      name: "Paramètres",
      href: "/parametres",
      icon: Settings,
      badge: undefined,
    },
  ];

  return (
    <>
      {/* Mobile Hamburger Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-[#080b13]/90 backdrop-blur-md border-b border-white/[0.08] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white font-black shadow-md shadow-blue-600/30">
            <Zap className="w-4 h-4 fill-white" />
          </div>
          <span className="font-extrabold text-base text-white tracking-tight">
            Jules<span className="text-blue-400">Factures</span>
          </span>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
          className="p-2 rounded-xl bg-white/[0.05] border border-white/[0.08] text-slate-300 hover:text-white"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/70 backdrop-blur-sm transition-opacity"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Main Sidebar Shell */}
      <aside
        className={cn(
          "fixed top-0 bottom-0 left-0 z-50 w-72 bg-[#090c14] border-r border-white/[0.07] flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 overflow-y-auto",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Top Header & Branding */}
        <div className="p-5 pb-2">
          <div className="flex items-center justify-between mb-5">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-blue-600 via-blue-500 to-cyan-400 flex items-center justify-center text-white shadow-lg shadow-blue-500/30 group-hover:scale-105 transition-transform">
                <Zap className="w-5 h-5 fill-white" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-lg text-white tracking-tight">
                    Jules<span className="text-blue-400">Factures</span>
                  </span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30 uppercase">
                    Pro
                  </span>
                </div>
                <span className="text-[11px] text-slate-500 font-medium">
                  SaaS Facturation UEMOA
                </span>
              </div>
            </Link>

            <button
              onClick={() => setMobileOpen(false)}
              aria-label="Fermer la navigation mobile"
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User / Company Status Card */}
          <div className="p-3.5 rounded-2xl bg-[#0e1422] border border-white/[0.06] mb-4">
            <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
              <span>Espace Entreprise</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/50" />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5 overflow-hidden">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xs shadow-inner flex-shrink-0">
                  {companyName.slice(0, 2).toUpperCase()}
                </div>
                <div className="overflow-hidden">
                  <div className="font-bold text-xs text-white truncate">
                    {companyName}
                  </div>
                  <div className="text-[11px] text-emerald-400 truncate flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Supabase Live
                  </div>
                </div>
              </div>

              <button
                onClick={handleLogout}
                disabled={loggingOut}
                title="Se déconnecter"
                aria-label="Se déconnecter"
                className="p-1.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-slate-400 hover:text-rose-400 hover:border-rose-500/30 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Nav List */}
          <nav className="space-y-1">
            {navigation.map((item) => {
              const isActive =
                item.href === "/dashboard"
                  ? pathname === "/dashboard" || pathname === "/"
                  : pathname.startsWith(item.href);

              const Icon = item.icon;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all duration-150 group",
                    isActive
                      ? "bg-blue-600/15 text-blue-400 border border-blue-500/25 shadow-sm shadow-blue-500/10"
                      : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={cn(
                        "w-4 h-4 transition-colors",
                        isActive
                          ? "text-blue-400"
                          : "text-slate-400 group-hover:text-slate-200"
                      )}
                    />
                    <span>{item.name}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={cn(
                        "px-2 py-0.5 rounded-full text-[10px] font-bold tabular-nums",
                        isActive
                          ? "bg-blue-500/20 text-blue-300"
                          : "bg-white/[0.06] text-slate-400"
                      )}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Quick Access Account / Auth Links */}
          <div className="mt-4 pt-3 border-t border-white/[0.06] space-y-1">
            <div className="px-3.5 pb-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Comptes & Accès
            </div>
            <Link
              href="/connexion"
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-medium transition-all",
                pathname === "/connexion"
                  ? "bg-blue-600/20 text-blue-300 font-semibold"
                  : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
              )}
            >
              <LogIn className="w-4 h-4 text-cyan-400" />
              <span>Se Connecter</span>
            </Link>
            <Link
              href="/inscription"
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-medium transition-all",
                pathname === "/inscription"
                  ? "bg-blue-600/20 text-blue-300 font-semibold"
                  : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
              )}
            >
              <UserPlus className="w-4 h-4 text-blue-400" />
              <span>Créer un Compte</span>
            </Link>
          </div>
        </div>

        {/* Bottom Pro Banner */}
        <div className="p-4 pt-2">
          <div className="relative overflow-hidden rounded-2xl p-3.5 bg-gradient-to-br from-blue-900/60 via-[#0e172e] to-[#0a0f1d] border border-blue-500/30 shadow-lg shadow-blue-950/50 group">
            <div className="absolute -top-8 -right-8 w-20 h-20 bg-blue-500/20 rounded-full blur-xl pointer-events-none" />

            <div className="flex items-center gap-2 mb-1">
              <div className="w-5 h-5 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-300">
                <Sparkles className="w-3 h-3" />
              </div>
              <span className="font-bold text-xs text-white">
                JulesFactures Pro
              </span>
            </div>

            <p className="text-[10px] text-slate-300/80 mb-2.5 leading-relaxed">
              Export PDF illimité, relances automatiques et multi-devises.
            </p>

            <Link
              href="/tarifs"
              className="w-full py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md shadow-blue-600/30 flex items-center justify-center gap-1.5 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Passer en Pro</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
