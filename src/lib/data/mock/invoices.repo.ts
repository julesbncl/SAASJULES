import { InvoicesRepository } from "../repository";
import { Invoice, InvoiceStatus, DashboardStats } from "../types";
import { mockInvoices, mockDashboardStats, mockClients } from "./fixtures";
import { calculateInvoiceTotals } from "../../calculations/invoice-totals";

let invoicesStore: Invoice[] = [...mockInvoices];

export const mockInvoicesRepository: InvoicesRepository = {
  async getAll(filters?: { status?: InvoiceStatus; clientId?: string }): Promise<Invoice[]> {
    let result = [...invoicesStore];
    if (filters?.status) {
      result = result.filter((inv) => inv.status === filters.status);
    }
    if (filters?.clientId) {
      result = result.filter((inv) => inv.clientId === filters.clientId);
    }
    return result;
  },

  async getById(id: string): Promise<Invoice | null> {
    const found = invoicesStore.find((inv) => inv.id === id);
    if (!found) return null;
    const client = mockClients.find((c) => c.id === found.clientId);
    return { ...found, client };
  },

  async getRecent(limit: number = 5): Promise<Invoice[]> {
    const sorted = [...invoicesStore].sort(
      (a, b) => new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime()
    );
    return sorted.slice(0, limit).map((inv) => ({
      ...inv,
      client: mockClients.find((c) => c.id === inv.clientId),
    }));
  },

  async getDashboardStats(): Promise<DashboardStats> {
    // Dynamically compute real stats from store or return high-fidelity dashboard snapshot
    const totalInvoiced = invoicesStore.reduce((acc, inv) => acc + inv.total, 0);
    const totalPaid = invoicesStore
      .filter((inv) => inv.status === "payee")
      .reduce((acc, inv) => acc + inv.total, 0);
    const totalPending = invoicesStore
      .filter((inv) => inv.status === "envoyee")
      .reduce((acc, inv) => acc + inv.total, 0);
    const totalOverdue = invoicesStore
      .filter((inv) => inv.status === "en_retard")
      .reduce((acc, inv) => acc + inv.total, 0);

    const collectionRate = totalInvoiced > 0 ? Math.round((totalPaid / totalInvoiced) * 100) : 0;

    return {
      ...mockDashboardStats,
      totalInvoiced: totalInvoiced || mockDashboardStats.totalInvoiced,
      totalPaid: totalPaid || mockDashboardStats.totalPaid,
      totalPending: totalPending || mockDashboardStats.totalPending,
      totalOverdue: totalOverdue || mockDashboardStats.totalOverdue,
      collectionRate: collectionRate || mockDashboardStats.collectionRate,
      invoiceCount: invoicesStore.length,
    };
  },

  async create(invoiceData): Promise<Invoice> {
    // Recalculate totals strictly on server/repo side
    const totals = calculateInvoiceTotals(
      invoiceData.lineItems.map((li) => ({ quantity: li.quantity, unitPrice: li.unitPrice })),
      invoiceData.vatRate || 18
    );

    const newInvoice: Invoice = {
      ...invoiceData,
      id: `inv_${Date.now()}`,
      subtotal: totals.subtotal,
      vatAmount: totals.vatAmount,
      total: totals.total,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    invoicesStore.unshift(newInvoice);
    return { ...newInvoice };
  },

  async update(id: string, data: Partial<Invoice>): Promise<Invoice> {
    const index = invoicesStore.findIndex((inv) => inv.id === id);
    if (index === -1) throw new Error("Facture introuvable");

    const existing = invoicesStore[index];
    let subtotal = existing.subtotal;
    let vatAmount = existing.vatAmount;
    let total = existing.total;

    if (data.lineItems) {
      const totals = calculateInvoiceTotals(
        data.lineItems.map((li) => ({ quantity: li.quantity, unitPrice: li.unitPrice })),
        data.vatRate ?? existing.vatRate
      );
      subtotal = totals.subtotal;
      vatAmount = totals.vatAmount;
      total = totals.total;
    }

    invoicesStore[index] = {
      ...existing,
      ...data,
      subtotal,
      vatAmount,
      total,
      updatedAt: new Date().toISOString(),
    };

    return { ...invoicesStore[index] };
  },

  async delete(id: string): Promise<boolean> {
    const initialLen = invoicesStore.length;
    invoicesStore = invoicesStore.filter((inv) => inv.id !== id);
    return invoicesStore.length < initialLen;
  },

  async markAsPaid(id: string): Promise<Invoice> {
    return this.update(id, { status: "payee" });
  },
};
