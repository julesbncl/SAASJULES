import { Client, Company, Invoice, DashboardStats, InvoiceStatus } from "./types";

export interface ClientsRepository {
  getAll(): Promise<Client[]>;
  getById(id: string): Promise<Client | null>;
  create(client: Omit<Client, "id" | "createdAt" | "totalInvoiced">): Promise<Client>;
  update(id: string, data: Partial<Client>): Promise<Client>;
  delete(id: string): Promise<boolean>;
}

export interface InvoicesRepository {
  getAll(filters?: { status?: InvoiceStatus; clientId?: string }): Promise<Invoice[]>;
  getById(id: string): Promise<Invoice | null>;
  getRecent(limit?: number): Promise<Invoice[]>;
  getDashboardStats(): Promise<DashboardStats>;
  create(invoice: Omit<Invoice, "id" | "createdAt" | "updatedAt">): Promise<Invoice>;
  update(id: string, data: Partial<Invoice>): Promise<Invoice>;
  delete(id: string): Promise<boolean>;
  markAsPaid(id: string): Promise<Invoice>;
}

export interface CompanyRepository {
  getCompany(): Promise<Company>;
  updateCompany(data: Partial<Company>): Promise<Company>;
}
