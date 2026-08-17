import Stripe from "stripe";

export const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY || "sk_test_mock_secret_key_placeholder",
  {
    apiVersion: "2024-06-20",
    typescript: true,
  }
);

export const STRIPE_PLANS = {
  starter: {
    name: "Starter",
    price: 5000, // 5000 FCFA / mois
    currency: "xof",
    interval: "month",
    description: "Pour freelances et consultants indépendants",
  },
  pro: {
    name: "Pro Entreprise",
    price: 15000, // 15 000 FCFA / mois
    currency: "xof",
    interval: "month",
    description: "Pour PME, agences et commerces en forte croissance",
  },
  enterprise: {
    name: "Sur Mesure",
    price: 45000, // 45 000 FCFA / mois
    currency: "xof",
    interval: "month",
    description: "Pour grands comptes et réseaux de distribution",
  },
} as const;
