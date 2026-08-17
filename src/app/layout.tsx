import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "JulesFactures — SaaS de Facturation pour Entrepreneurs Africains",
  description: "Plateforme moderne de facturation, devis et gestion financière en FCFA.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`dark ${jakarta.variable} ${mono.variable}`}>
      <body className="antialiased bg-[#07090e] text-slate-100 min-h-screen font-sans">
        {children}
      </body>
    </html>
  );
}
