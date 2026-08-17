import { z } from "zod";

export const lineItemSchema = z.object({
  id: z.string().optional(),
  description: z.string().min(1, "La description est requise"),
  quantity: z.number().min(0.01, "La quantité doit être supérieure à 0"),
  unitPrice: z.number().min(0, "Le prix unitaire doit être positif ou nul"),
  total: z.number().optional(),
});

export const invoiceSchema = z.object({
  invoiceNumber: z.string().min(1, "Le numéro de facture est requis"),
  clientId: z.string().min(1, "Veuillez sélectionner un client"),
  issueDate: z.string().min(1, "La date d'émission est requise"),
  dueDate: z.string().min(1, "La date d'échéance est requise"),
  status: z.enum(["payee", "envoyee", "en_retard", "brouillon"]),
  vatRate: z.number().min(0).max(100).default(18),
  notes: z.string().optional(),
  paymentMethod: z.string().optional(),
  lineItems: z.array(lineItemSchema).min(1, "La facture doit contenir au moins un article"),
});

export type InvoiceFormData = z.infer<typeof invoiceSchema>;
export type LineItemFormData = z.infer<typeof lineItemSchema>;
