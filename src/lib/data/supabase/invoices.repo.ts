import { InvoicesRepository } from "../repository";
import { Invoice, InvoiceStatus, DashboardStats } from "../types";
import {
  getSupabase,
  getCurrentCompanyId,
  mapInvoiceFromDb,
  mapLineItemFromDb,
  mapClientFromDb,
} from "./helpers";
import { calculateInvoiceTotals } from "../../calculations/invoice-totals";

export const supabaseInvoicesRepository: InvoicesRepository = {
  async getAll(filters?: { status?: InvoiceStatus; clientId?: string }): Promise<Invoice[]> {
    const supabase = await getSupabase();
    const companyId = await getCurrentCompanyId(supabase);

    let query = supabase
      .from("invoices_view")
      .select("*, clients(*)")
      .eq("company_id", companyId)
      .order("issue_date", { ascending: false });

    if (filters?.status) {
      query = query.eq("status", filters.status);
    }
    if (filters?.clientId) {
      query = query.eq("client_id", filters.clientId);
    }

    const { data, error } = await query;
    if (error || !data) {
      console.error("Error fetching invoices:", error);
      return [];
    }

    return data.map((row) => mapInvoiceFromDb(row, []));
  },

  async getById(id: string): Promise<Invoice | null> {
    const supabase = await getSupabase();
    const companyId = await getCurrentCompanyId(supabase);

    const { data: invoiceRow, error: invError } = await supabase
      .from("invoices_view")
      .select("*, clients(*)")
      .eq("id", id)
      .eq("company_id", companyId)
      .maybeSingle();

    if (invError || !invoiceRow) return null;

    // Fetch line items
    const { data: lineRows } = await supabase
      .from("invoice_line_items")
      .select("*")
      .eq("invoice_id", id)
      .eq("company_id", companyId)
      .order("created_at", { ascending: true });

    const lineItems = (lineRows || []).map(mapLineItemFromDb);
    const client = invoiceRow.clients ? mapClientFromDb(invoiceRow.clients) : undefined;

    return mapInvoiceFromDb(invoiceRow, lineItems, client);
  },

  async getRecent(limit: number = 5): Promise<Invoice[]> {
    const supabase = await getSupabase();
    const companyId = await getCurrentCompanyId(supabase);

    const { data, error } = await supabase
      .from("invoices_view")
      .select("*, clients(*)")
      .eq("company_id", companyId)
      .order("issue_date", { ascending: false })
      .limit(limit);

    if (error || !data) {
      console.error("Error fetching recent invoices:", error);
      return [];
    }

    return data.map((row) => mapInvoiceFromDb(row, []));
  },

  async getDashboardStats(): Promise<DashboardStats> {
    const supabase = await getSupabase();
    const companyId = await getCurrentCompanyId(supabase);

    // Fetch all derived invoices from view
    const { data: invoices } = await supabase
      .from("invoices_view")
      .select("total, status, issue_date")
      .eq("company_id", companyId);

    // Count clients
    const { count: clientCount } = await supabase
      .from("clients")
      .select("*", { count: "exact", head: true })
      .eq("company_id", companyId);

    const invList = invoices || [];
    const totalInvoiced = invList.reduce((acc, inv) => acc + Number(inv.total), 0);
    const totalPaid = invList
      .filter((inv) => inv.status === "payee")
      .reduce((acc, inv) => acc + Number(inv.total), 0);
    const totalPending = invList
      .filter((inv) => inv.status === "envoyee")
      .reduce((acc, inv) => acc + Number(inv.total), 0);
    const totalOverdue = invList
      .filter((inv) => inv.status === "en_retard")
      .reduce((acc, inv) => acc + Number(inv.total), 0);

    const collectionRate = totalInvoiced > 0 ? Math.round((totalPaid / totalInvoiced) * 100) : 0;

    // Monthly volume breakdown
    const monthsNames = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sep", "Oct", "Nov", "Déc"];
    const monthlyMap: Record<string, { invoiced: number; collected: number }> = {};

    // Initialize recent 6 months
    const currentMonthIndex = new Date().getMonth();
    for (let i = 5; i >= 0; i--) {
      const mIdx = (currentMonthIndex - i + 12) % 12;
      monthlyMap[monthsNames[mIdx]] = { invoiced: 0, collected: 0 };
    }

    for (const inv of invList) {
      if (inv.issue_date) {
        const d = new Date(inv.issue_date);
        const mName = monthsNames[d.getMonth()];
        if (monthlyMap[mName]) {
          monthlyMap[mName].invoiced += Number(inv.total);
          if (inv.status === "payee") {
            monthlyMap[mName].collected += Number(inv.total);
          }
        }
      }
    }

    const monthlyVolume = Object.entries(monthlyMap).map(([month, data]) => ({
      month,
      invoiced: data.invoiced,
      collected: data.collected,
    }));

    return {
      totalInvoiced,
      totalPaid,
      totalPending,
      totalOverdue,
      collectionRate,
      invoiceCount: invList.length,
      clientCount: clientCount || 0,
      monthlyGrowth: 14.5,
      monthlyGoal: 5000000,
      monthlyVolume,
    };
  },

  async create(invoiceData): Promise<Invoice> {
    const supabase = await getSupabase();
    const companyId = await getCurrentCompanyId(supabase);

    // Calculate totals strictly
    const totals = calculateInvoiceTotals(
      (invoiceData.lineItems || []).map((li) => ({ quantity: li.quantity, unitPrice: li.unitPrice })),
      invoiceData.vatRate || 18
    );

    // Generate atomic invoice number if not explicitly set
    let invoiceNumber = invoiceData.invoiceNumber;
    if (!invoiceNumber) {
      const { data: generatedNumber, error: genError } = await supabase.rpc("next_invoice_number", {
        p_company_id: companyId,
      });
      if (genError || !generatedNumber) {
        throw new Error(genError?.message || "Erreur de génération du numéro de facture");
      }
      invoiceNumber = generatedNumber;
    }

    // Insert Invoice
    const dbStatus = invoiceData.status === "en_retard" ? "envoyee" : invoiceData.status || "envoyee";
    const { data: newInvoiceRow, error: invError } = await supabase
      .from("invoices")
      .insert({
        company_id: companyId,
        client_id: invoiceData.clientId,
        invoice_number: invoiceNumber,
        issue_date: invoiceData.issueDate || new Date().toISOString().split("T")[0],
        due_date: invoiceData.dueDate,
        status: dbStatus,
        subtotal: totals.subtotal,
        vat_rate: totals.vatRate,
        vat_amount: totals.vatAmount,
        total: totals.total,
        notes: invoiceData.notes || null,
        payment_method: invoiceData.paymentMethod || null,
      })
      .select()
      .single();

    if (invError || !newInvoiceRow) {
      throw new Error(invError?.message || "Échec de création de la facture dans Supabase");
    }

    // Insert Line Items
    if (invoiceData.lineItems && invoiceData.lineItems.length > 0) {
      const linePayloads = invoiceData.lineItems.map((li) => ({
        company_id: companyId,
        invoice_id: newInvoiceRow.id,
        description: li.description,
        quantity: li.quantity,
        unit_price: li.unitPrice,
        total: Math.round(Number(li.quantity) * Number(li.unitPrice)),
      }));

      const { error: lineError } = await supabase.from("invoice_line_items").insert(linePayloads);
      if (lineError) {
        console.error("Error inserting line items:", lineError);
      }
    }

    return (await this.getById(newInvoiceRow.id)) as Invoice;
  },

  async update(id: string, data: Partial<Invoice>): Promise<Invoice> {
    const supabase = await getSupabase();
    const companyId = await getCurrentCompanyId(supabase);

    const updatePayload: Record<string, unknown> = {
      updated_at: new Date().toISOString(),
    };

    if (data.clientId !== undefined) updatePayload.client_id = data.clientId;
    if (data.invoiceNumber !== undefined) updatePayload.invoice_number = data.invoiceNumber;
    if (data.issueDate !== undefined) updatePayload.issue_date = data.issueDate;
    if (data.dueDate !== undefined) updatePayload.due_date = data.dueDate;
    if (data.status !== undefined) {
      updatePayload.status = data.status === "en_retard" ? "envoyee" : data.status;
    }
    if (data.notes !== undefined) updatePayload.notes = data.notes;
    if (data.paymentMethod !== undefined) updatePayload.payment_method = data.paymentMethod;

    // If line items updated, recalculate totals and replace line items
    if (data.lineItems) {
      const totals = calculateInvoiceTotals(
        data.lineItems.map((li) => ({ quantity: li.quantity, unitPrice: li.unitPrice })),
        data.vatRate || 18
      );
      updatePayload.subtotal = totals.subtotal;
      updatePayload.vat_rate = totals.vatRate;
      updatePayload.vat_amount = totals.vatAmount;
      updatePayload.total = totals.total;

      // Delete old line items
      await supabase.from("invoice_line_items").delete().eq("invoice_id", id).eq("company_id", companyId);

      // Insert new line items
      const linePayloads = data.lineItems.map((li) => ({
        company_id: companyId,
        invoice_id: id,
        description: li.description,
        quantity: li.quantity,
        unit_price: li.unitPrice,
        total: Math.round(Number(li.quantity) * Number(li.unitPrice)),
      }));

      await supabase.from("invoice_line_items").insert(linePayloads);
    }

    const { error: updateError } = await supabase
      .from("invoices")
      .update(updatePayload)
      .eq("id", id)
      .eq("company_id", companyId);

    if (updateError) {
      throw new Error(updateError.message);
    }

    return (await this.getById(id)) as Invoice;
  },

  async delete(id: string): Promise<boolean> {
    const supabase = await getSupabase();
    const companyId = await getCurrentCompanyId(supabase);

    const { error } = await supabase
      .from("invoices")
      .delete()
      .eq("id", id)
      .eq("company_id", companyId);

    if (error) {
      throw new Error(error.message);
    }

    return true;
  },

  async markAsPaid(id: string): Promise<Invoice> {
    return this.update(id, { status: "payee" });
  },
};
