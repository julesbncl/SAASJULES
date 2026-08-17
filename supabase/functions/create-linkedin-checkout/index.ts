import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import Stripe from "npm:stripe@^14.25.0";

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const PLANS: Record<string, { name: string; amount: number; description: string; mode: string }> = {
  starter: {
    name: "JulesFactures — Formule Starter",
    amount: 5000,
    description: "Pour freelances et consultants indépendants (20 factures/mois)",
    mode: "subscription",
  },
  pro: {
    name: "JulesFactures — Formule Pro Entreprise",
    amount: 15000,
    description: "Pour PME et agences (Factures illimitées, relances automatiques)",
    mode: "subscription",
  },
  enterprise: {
    name: "JulesFactures — Formule Sur Mesure",
    amount: 45000,
    description: "Pour grands comptes et réseaux (Multi-utilisateurs & API)",
    mode: "subscription",
  },
  linkedin: {
    name: "Analyse LinkedIn Premium — JulesFactures",
    amount: 15000,
    description: "Audit complet & optimisation de profil LinkedIn par IA",
    mode: "payment",
  },
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) {
      throw new Error(
        "Clé secrète Stripe (STRIPE_SECRET_KEY) manquante dans les secrets Supabase."
      );
    }

    const stripe = new Stripe(stripeKey, {
      apiVersion: "2023-10-16",
      httpClient: Stripe.createFetchHttpClient(),
    });

    const body = await req.json().catch(() => ({}));
    const {
      planKey = "pro",
      planName,
      description,
      amount,
      currency = "xof",
      mode,
      userId,
      userEmail,
      linkedinProfileUrl,
      successUrl,
      cancelUrl,
    } = body;

    const selectedPlan = PLANS[planKey] || PLANS.pro;
    const finalName = planName || selectedPlan.name;
    const finalDescription = description || selectedPlan.description;
    const finalAmount = amount !== undefined ? Number(amount) : selectedPlan.amount;
    const finalMode = (mode || selectedPlan.mode) as Stripe.Checkout.SessionCreateParams.Mode;

    const origin = req.headers.get("origin") || "https://saasjules.vercel.app";
    const finalSuccessUrl =
      successUrl ||
      `${origin}/dashboard?checkout=success&plan=${planKey}`;
    const finalCancelUrl =
      cancelUrl || `${origin}/tarifs?checkout=cancelled`;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: currency.toLowerCase(),
            product_data: {
              name: finalName,
              description: finalDescription,
            },
            unit_amount: finalAmount,
            ...(finalMode === "subscription"
              ? { recurring: { interval: "month" } }
              : {}),
          },
          quantity: 1,
        },
      ],
      mode: finalMode,
      customer_email: userEmail || undefined,
      success_url: finalSuccessUrl,
      cancel_url: finalCancelUrl,
      metadata: {
        userId: userId || "anonymous",
        planKey: planKey,
        linkedinProfileUrl: linkedinProfileUrl || "",
      },
    });

    return new Response(
      JSON.stringify({
        url: session.url,
        sessionId: session.id,
      }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
        status: 200,
      }
    );
  } catch (error: unknown) {
    console.error("Erreur Edge Function Stripe Checkout:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Erreur interne du serveur";

    return new Response(
      JSON.stringify({
        error: errorMessage,
      }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
        status: 400,
      }
    );
  }
});
