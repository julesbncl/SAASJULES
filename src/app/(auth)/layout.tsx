import React from "react";
import Link from "next/link";
import { Zap } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#06080e] flex flex-col justify-between p-4 sm:p-6 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Top Branding */}
      <header className="relative z-10 flex justify-center py-4">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-blue-600 via-blue-500 to-cyan-400 flex items-center justify-center text-white shadow-lg shadow-blue-500/30 group-hover:scale-105 transition-transform">
            <Zap className="w-5 h-5 fill-white" />
          </div>
          <span className="font-extrabold text-xl text-white tracking-tight">
            Jules<span className="text-blue-400">Factures</span>
          </span>
        </Link>
      </header>

      {/* Auth Form Container */}
      <main className="relative z-10 flex-1 flex items-center justify-center py-6">
        <div className="w-full max-w-md">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center py-4 text-xs text-slate-500">
        <p>© 2026 JulesFactures. Plateforme de facturation sécurisée pour l&apos;Afrique de l&apos;Ouest.</p>
      </footer>
    </div>
  );
}
