import { createClient } from "@/lib/supabase/client";
import { SupabaseClient } from "@supabase/supabase-js";
import { Client, Company, Invoice, InvoiceLineItem, InvoiceStatus } from "../types";

export async function getSupabase(): Promise<SupabaseClient> {
  return createClient();
}

export async function getCurrentCompanyId(supabase: SupabaseClient): Promise<string> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    const { data: comp } = await supabase
      .from("companies")
      .select("id")
      .eq("owner_id", user.id)
      .maybeSingle();

    if (comp?.id) return comp.id;
  }

  // Fallback: get the first company available (useful during initial setup / demo)
  const { data: firstComp } = await supabase
    .from("companies")
    .select("id")
    .limit(1)
    .maybeSingle();

  if (firstComp?.id) return firstComp.id;

  throw new Error("Aucune entreprise trouvée. Veuillez vous connecter ou créer un compte.");
}

export interface CompanyDbRow {
  id: string;
  name: string;
  legal_status?: string;
  ifu?: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  logo_url?: string;
  vat_rate: number | string;
  currency?: string;
}

export function mapCompanyFromDb(row: CompanyDbRow): Company {
  return {
    id: row.id,
    name: row.name,
    legalStatus: row.legal_status,
    ifu: row.ifu,
    email: row.email,
    phone: row.phone,
    address: row.address,
    city: row.city,
    country: row.country,
    logoUrl: row.logo_url,
    vatRate: Number(row.vat_rate) || 18,
    currency: row.currency || "FCFA",
  };
}

export interface ClientDbRow {
  id: string;
  name: string;
  company_name?: string;
  email: string;
  phone: string;
  address?: string;
  city: string;
  country: string;
  ifu?: string;
  avatar_url?: string;
  created_at: string;
}

export function mapClientFromDb(row: ClientDbRow, totalInvoiced = 0): Client {
  return {
    id: row.id,
    name: row.name,
    companyName: row.company_name,
    email: row.email,
    phone: row.phone,
    address: row.address,
    city: row.city,
    country: row.country,
    ifu: row.ifu,
    avatarUrl: row.avatar_url,
    createdAt: row.created_at,
    totalInvoiced,
  };
}

export interface LineItemDbRow {
  id: string;
  invoice_id: string;
  description: string;
  quantity: number | string;
  unit_price: number | string;
  total: number | string;
}

export function mapLineItemFromDb(row: LineItemDbRow): InvoiceLineItem {
  return {
    id: row.id,
    invoiceId: row.invoice_id,
    description: row.description,
    quantity: Number(row.quantity) || 1,
    unitPrice: Number(row.unit_price) || 0,
    total: Number(row.total) || 0,
  };
}

export interface InvoiceDbRow {
  id: string;
  invoice_number: string;
  client_id: string;
  clients?: ClientDbRow;
  company_id: string;
  issue_date: string;
  due_date: string;
  status?: string;
  derived_status?: string;
  subtotal: number | string;
  vat_rate: number | string;
  vat_amount: number | string;
  total: number | string;
  notes?: string;
  payment_method?: string;
  created_at: string;
  updated_at: string;
}

export function mapInvoiceFromDb(
  row: InvoiceDbRow,
  lineItems: InvoiceLineItem[] = [],
  client?: Client
): Invoice {
  return {
    id: row.id,
    invoiceNumber: row.invoice_number,
    clientId: row.client_id,
    client: client || (row.clients ? mapClientFromDb(row.clients) : undefined),
    companyId: row.company_id,
    issueDate: row.issue_date,
    dueDate: row.due_date,
    status: (row.status || row.derived_status || "envoyee") as InvoiceStatus,
    subtotal: Number(row.subtotal) || 0,
    vatRate: Number(row.vat_rate) || 18,
    vatAmount: Number(row.vat_amount) || 0,
    total: Number(row.total) || 0,
    notes: row.notes,
    paymentMethod: row.payment_method,
    lineItems,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}
