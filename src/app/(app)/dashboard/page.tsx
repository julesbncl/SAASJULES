import React from "react";
import { Topbar } from "@/components/layout/topbar";
import { StatCard } from "@/components/dashboard/stat-card";
import { CollectedMeter } from "@/components/dashboard/collected-meter";
import { MonthlyVolumeChart } from "@/components/dashboard/monthly-volume-chart";
import { AIInsightCard } from "@/components/dashboard/ai-insight-card";
import { RecentInvoicesTable } from "@/components/dashboard/recent-invoices-table";
import { invoicesRepo } from "@/lib/data";
import {
  DollarSign,
  CheckCircle2,
  Clock,
  AlertTriangle,
} from "lucide-react";

export const revalidate = 0; // Dynamic server component

export default async function DashboardPage() {
  const stats = await invoicesRepo.getDashboardStats();
  const recentInvoices = await invoicesRepo.getRecent(10);

  return (
    <div className="min-h-full pb-16">
      {/* Topbar Header */}
      <Topbar
        title="Tableau de Bord"
        subtitle="Suivi des performances financières & facturation UEMOA"
      />

      <div className="px-4 lg:px-8 py-6 space-y-6 max-w-7xl mx-auto">
        {/* Row 1: Featured Visual Insights Grid (Fintech Screenshot Style) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Card 1: AI Insights Banner */}
          <div className="min-h-[260px]">
            <AIInsightCard
              growthRate={stats.monthlyGrowth}
              highlightText="Votre volume facturé a augmenté de 18% ce mois-ci."
              recommendation="3 factures arrivent à échéance cette semaine (950 000 FCFA). Envoyez une relance WhatsApp ou Email en 1 clic."
            />
          </div>

          {/* Card 2: Balance & Revenue Overview Chart */}
          <div className="min-h-[260px]">
            <MonthlyVolumeChart data={stats.monthlyVolume} />
          </div>

          {/* Card 3: Collected Meter Gauge */}
          <div className="min-h-[260px]">
            <CollectedMeter
              percentage={stats.collectionRate}
              collectedAmount={stats.totalPaid}
              monthlyGoal={stats.monthlyGoal}
              growthRate={stats.monthlyGrowth}
            />
          </div>
        </div>

        {/* Row 2: 4 Key Financial KPI Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Facturé (TTC)"
            amount={stats.totalInvoiced}
            change={{
              value: stats.monthlyGrowth,
              isPositive: true,
              periodText: "vs mois dernier",
            }}
            icon={DollarSign}
            iconColorClass="text-blue-400"
            iconBgClass="bg-blue-500/10 border-blue-500/25"
            badge={`${stats.invoiceCount} factures`}
          />

          <StatCard
            title="Total Encaissé"
            amount={stats.totalPaid}
            change={{
              value: stats.collectionRate,
              isPositive: true,
              periodText: "taux de recouvrement",
            }}
            icon={CheckCircle2}
            iconColorClass="text-emerald-400"
            iconBgClass="bg-emerald-500/10 border-emerald-500/25"
            accentBorderClass="hover:border-emerald-500/30"
          />

          <StatCard
            title="En Attente"
            amount={stats.totalPending}
            subtitle="8 factures envoyées"
            icon={Clock}
            iconColorClass="text-amber-400"
            iconBgClass="bg-amber-500/10 border-amber-500/25"
            accentBorderClass="hover:border-amber-500/30"
          />

          <StatCard
            title="En Retard"
            amount={stats.totalOverdue}
            change={{
              value: 3,
              isPositive: false,
              periodText: "3 factures échues",
            }}
            icon={AlertTriangle}
            iconColorClass="text-rose-400"
            iconBgClass="bg-rose-500/10 border-rose-500/25 animate-pulse"
            accentBorderClass="hover:border-rose-500/30"
          />
        </div>

        {/* Row 3: Recent Invoices Data Table */}
        <div>
          <RecentInvoicesTable invoices={recentInvoices} />
        </div>
      </div>
    </div>
  );
}
