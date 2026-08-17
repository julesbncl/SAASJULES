import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import Stripe from "npm:stripe@^14.25.0";

// Headers CORS pour autoriser les requêtes depuis n'importe quel frontend
export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req: Request) => {
  // 1. Gestion des requêtes préliminaires CORS (OPTIONS)
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) {
      throw new Error(
        "Clé secrète Stripe (STRIPE_SECRET_KEY) manquante dans les variables d'environnement Supabase."
      );
    }

    const stripe = new Stripe(stripeKey, {
      apiVersion: "2023-10-16",
      httpClient: Stripe.createFetchHttpClient(),
    });

    // 2. Extraction des données du corps de la requête
    const body = await req.json().catch(() => ({}));
    const {
      userId,
      userEmail,
      linkedinProfileUrl,
      successUrl,
      cancelUrl,
      amount = 15000, // 15 000 FCFA par défaut
      currency = "xof", // Devise FCFA (XOF) ou EUR / USD
      mode = "payment", // "payment" pour paiement unique, "subscription" pour abonnement
    } = body;

    // Détection de l'origine pour les URLs de redirection par défaut
    const origin = req.headers.get("origin") || "https://saasjules.vercel.app";

    const finalSuccessUrl =
      successUrl ||
      `${origin}/dashboard?payment=success&feature=linkedin-analysis`;
    const finalCancelUrl =
      cancelUrl || `${origin}/tarifs?payment=cancelled`;

    // 3. Création de la session Stripe Checkout
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: currency.toLowerCase(),
            product_data: {
              name: "Analyse LinkedIn Premium — JulesFactures",
              description:
                "Audit complet et optimisation de profil LinkedIn par IA avec recommandations stratégiques.",
              images: [
                "https://images.unsplash.com/photo-1616469829941-c7200edec809?w=800&auto=format&fit=crop&q=80",
              ],
            },
            unit_amount: amount,
            ...(mode === "subscription"
              ? { recurring: { interval: "month" } }
              : {}),
          },
          quantity: 1,
        },
      ],
      mode: mode as Stripe.Checkout.SessionCreateParams.Mode,
      customer_email: userEmail || undefined,
      success_url: finalSuccessUrl,
      cancel_url: finalCancelUrl,
      metadata: {
        userId: userId || "anonymous",
        feature: "linkedin_premium_analysis",
        linkedinProfileUrl: linkedinProfileUrl || "",
      },
    });

    // 4. Retour de l'URL de redirection Checkout
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
