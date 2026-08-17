import { z } from "zod";

export const clientSchema = z.object({
  name: z.string().min(2, "Le nom du contact est requis"),
  companyName: z.string().optional(),
  email: z.string().email("Adresse email invalide"),
  phone: z.string().min(6, "Numéro de téléphone requis"),
  address: z.string().optional(),
  city: z.string().min(2, "La ville est requise"),
  country: z.string().min(2, "Le pays est requis"),
  ifu: z.string().optional(), // IFU / NINEA / RCCM
});

export type ClientFormData = z.infer<typeof clientSchema>;
