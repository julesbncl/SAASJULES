import { ClientsRepository } from "../repository";
import { Client } from "../types";
import { getSupabase, getCurrentCompanyId, mapClientFromDb } from "./helpers";

export const supabaseClientsRepository: ClientsRepository = {
  async getAll(): Promise<Client[]> {
    const supabase = await getSupabase();
    const companyId = await getCurrentCompanyId(supabase);

    // Fetch clients
    const { data: clientsData, error: clientsError } = await supabase
      .from("clients")
      .select("*")
      .eq("company_id", companyId)
      .order("created_at", { ascending: false });

    if (clientsError || !clientsData) {
      console.error("Error fetching clients:", clientsError);
      return [];
    }

    // Fetch invoices for calculating totalInvoiced per client
    const { data: invoicesData } = await supabase
      .from("invoices")
      .select("client_id, total")
      .eq("company_id", companyId);

    const clientTotalsMap: Record<string, number> = {};
    if (invoicesData) {
      for (const inv of invoicesData) {
        clientTotalsMap[inv.client_id] = (clientTotalsMap[inv.client_id] || 0) + Number(inv.total);
      }
    }

    return clientsData.map((row) => mapClientFromDb(row, clientTotalsMap[row.id] || 0));
  },

  async getById(id: string): Promise<Client | null> {
    const supabase = await getSupabase();
    const companyId = await getCurrentCompanyId(supabase);

    const { data, error } = await supabase
      .from("clients")
      .select("*")
      .eq("id", id)
      .eq("company_id", companyId)
      .maybeSingle();

    if (error || !data) return null;

    // Calculate totalInvoiced for this client
    const { data: invoicesData } = await supabase
      .from("invoices")
      .select("total")
      .eq("client_id", id)
      .eq("company_id", companyId);

    const totalInvoiced = (invoicesData || []).reduce((acc, inv) => acc + Number(inv.total), 0);

    return mapClientFromDb(data, totalInvoiced);
  },

  async create(clientData): Promise<Client> {
    const supabase = await getSupabase();
    const companyId = await getCurrentCompanyId(supabase);

    const insertPayload: Record<string, unknown> = {
      company_id: companyId,
      name: clientData.name,
      company_name: clientData.companyName || null,
      email: clientData.email,
      phone: clientData.phone,
      address: clientData.address || null,
      city: clientData.city || "Dakar",
      country: clientData.country || "Sénégal",
      ifu: clientData.ifu || null,
      avatar_url: clientData.avatarUrl || null,
    };

    const { data, error } = await supabase
      .from("clients")
      .insert(insertPayload)
      .select()
      .single();

    if (error || !data) {
      throw new Error(error?.message || "Échec de l'enregistrement du client dans Supabase");
    }

    return mapClientFromDb(data, 0);
  },

  async update(id: string, data: Partial<Client>): Promise<Client> {
    const supabase = await getSupabase();
    const companyId = await getCurrentCompanyId(supabase);

    const updatePayload: Record<string, unknown> = {
      updated_at: new Date().toISOString(),
    };

    if (data.name !== undefined) updatePayload.name = data.name;
    if (data.companyName !== undefined) updatePayload.company_name = data.companyName;
    if (data.email !== undefined) updatePayload.email = data.email;
    if (data.phone !== undefined) updatePayload.phone = data.phone;
    if (data.address !== undefined) updatePayload.address = data.address;
    if (data.city !== undefined) updatePayload.city = data.city;
    if (data.country !== undefined) updatePayload.country = data.country;
    if (data.ifu !== undefined) updatePayload.ifu = data.ifu;
    if (data.avatarUrl !== undefined) updatePayload.avatar_url = data.avatarUrl;

    const { data: updated, error } = await supabase
      .from("clients")
      .update(updatePayload)
      .eq("id", id)
      .eq("company_id", companyId)
      .select()
      .single();

    if (error || !updated) {
      throw new Error(error?.message || "Échec de la modification du client");
    }

    return this.getById(id) as Promise<Client>;
  },

  async delete(id: string): Promise<boolean> {
    const supabase = await getSupabase();
    const companyId = await getCurrentCompanyId(supabase);

    const { error } = await supabase
      .from("clients")
      .delete()
      .eq("id", id)
      .eq("company_id", companyId);

    if (error) {
      throw new Error(error.message);
    }

    return true;
  },
};
