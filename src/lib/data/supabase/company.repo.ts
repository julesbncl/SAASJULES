import { CompanyRepository } from "../repository";
import { Company } from "../types";
import { getSupabase, getCurrentCompanyId, mapCompanyFromDb } from "./helpers";

export const supabaseCompanyRepository: CompanyRepository = {
  async getCompany(): Promise<Company> {
    const supabase = await getSupabase();
    const companyId = await getCurrentCompanyId(supabase);

    const { data, error } = await supabase
      .from("companies")
      .select("*")
      .eq("id", companyId)
      .single();

    if (error || !data) {
      throw new Error(error?.message || "Impossible de charger les informations de l'entreprise");
    }

    return mapCompanyFromDb(data);
  },

  async updateCompany(data: Partial<Company>): Promise<Company> {
    const supabase = await getSupabase();
    const companyId = await getCurrentCompanyId(supabase);

    const updatePayload: Record<string, unknown> = {
      updated_at: new Date().toISOString(),
    };

    if (data.name !== undefined) updatePayload.name = data.name;
    if (data.legalStatus !== undefined) updatePayload.legal_status = data.legalStatus;
    if (data.ifu !== undefined) updatePayload.ifu = data.ifu;
    if (data.email !== undefined) updatePayload.email = data.email;
    if (data.phone !== undefined) updatePayload.phone = data.phone;
    if (data.address !== undefined) updatePayload.address = data.address;
    if (data.city !== undefined) updatePayload.city = data.city;
    if (data.country !== undefined) updatePayload.country = data.country;
    if (data.vatRate !== undefined) updatePayload.vat_rate = data.vatRate;
    if (data.currency !== undefined) updatePayload.currency = data.currency;
    if (data.logoUrl !== undefined) updatePayload.logo_url = data.logoUrl;

    const { data: updated, error } = await supabase
      .from("companies")
      .update(updatePayload)
      .eq("id", companyId)
      .select()
      .single();

    if (error || !updated) {
      throw new Error(error?.message || "Échec de la mise à jour des paramètres de l'entreprise");
    }

    return mapCompanyFromDb(updated);
  },
};
