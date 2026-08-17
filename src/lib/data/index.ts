import { supabaseClientsRepository } from "./supabase/clients.repo";
import { supabaseInvoicesRepository } from "./supabase/invoices.repo";
import { supabaseCompanyRepository } from "./supabase/company.repo";
import { ClientsRepository, InvoicesRepository, CompanyRepository } from "./repository";

// Active Full-Stack Repositories backed by Supabase PostgreSQL
export const clientsRepo: ClientsRepository = supabaseClientsRepository;
export const invoicesRepo: InvoicesRepository = supabaseInvoicesRepository;
export const companyRepo: CompanyRepository = supabaseCompanyRepository;

export * from "./types";
export * from "./repository";
