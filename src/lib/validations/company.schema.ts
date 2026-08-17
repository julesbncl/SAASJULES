import { z } from "zod";

export const companySchema = z.object({
  name: z.string().min(2, "Le nom de l'entreprise est requis"),
  legalStatus: z.string().optional(),
  ifu: z.string().optional(),
  email: z.string().email("Adresse email invalide"),
  phone: z.string().min(6, "Numéro de téléphone requis"),
  address: z.string().min(2, "Adresse requise"),
  city: z.string().min(2, "Ville requise"),
  country: z.string().min(2, "Pays requis"),
  vatRate: z.number().min(0).max(100),
  currency: z.string().default("FCFA"),
  logoUrl: z.string().optional(),
});

export type CompanyFormData = z.infer<typeof companySchema>;
