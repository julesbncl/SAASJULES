export type InvoiceStatus = "payee" | "envoyee" | "en_retard" | "brouillon";

export interface Company {
  id: string;
  name: string;
  legalStatus?: string; // SARL, SAS, etc.
  ifu?: string; // Numéro IFU / NINEA / RCCM
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  logoUrl?: string;
  vatRate: number; // e.g. 18
  currency: string;
}

export interface Client {
  id: string;
  name: string;
  companyName?: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  country?: string;
  ifu?: string;
  avatarUrl?: string;
  createdAt: string;
  totalInvoiced: number;
}

export interface InvoiceLineItem {
  id: string;
  invoiceId: string;
  description: string;
  quantity: number;
  unitPrice: number; // FCFA integer
  total: number; // FCFA integer
}

export interface Invoice {
  id: string;
  invoiceNumber: string; // ex: FAC-2026-0042
  clientId: string;
  client?: Client;
  companyId: string;
  issueDate: string; // ISO string
  dueDate: string; // ISO string
  status: InvoiceStatus;
  subtotal: number; // FCFA integer HT
  vatRate: number; // e.g. 18
  vatAmount: number; // FCFA integer
  total: number; // FCFA integer TTC
  notes?: string;
  paymentMethod?: string; // Wave, Orange Money, Virement, Chèque, Espèces
  lineItems: InvoiceLineItem[];
  createdAt: string;
  updatedAt: string;
}

export interface DashboardStats {
  totalInvoiced: number;
  totalPaid: number;
  totalPending: number;
  totalOverdue: number;
  collectionRate: number; // Percentage, e.g. 68
  invoiceCount: number;
  clientCount: number;
  monthlyGrowth: number; // Percentage, e.g. 12
  monthlyGoal: number;
  monthlyVolume: {
    month: string;
    invoiced: number;
    collected: number;
  }[];
}
