import { NextResponse } from "next/server";
import { stripe, STRIPE_PLANS } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const { planKey } = await req.json();

    if (!planKey || !(planKey in STRIPE_PLANS)) {
      return NextResponse.json(
        { error: "Plan d'abonnement invalide." },
        { status: 400 }
      );
    }

    const plan = STRIPE_PLANS[planKey as keyof typeof STRIPE_PLANS];
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Check if Stripe key is configured
    if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY.startsWith("sk_test_mock")) {
      return NextResponse.json(
        {
          error:
            "Veuillez configurer votre clé secrète Stripe (STRIPE_SECRET_KEY) dans vos variables d'environnement.",
        },
        { status: 400 }
      );
    }

    const origin = req.headers.get("origin") || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: plan.currency,
            product_data: {
              name: `JulesFactures — Formule ${plan.name}`,
              description: plan.description,
            },
            unit_amount: plan.price, // XOF is a zero-decimal currency in Stripe
            recurring: {
              interval: plan.interval as Stripe.Checkout.SessionCreateParams.LineItem.PriceData.Recurring.Interval,
            },
          },
          quantity: 1,
        },
      ],
      mode: "subscription",
      customer_email: user?.email || undefined,
      success_url: `${origin}/dashboard?checkout=success&plan=${planKey}`,
      cancel_url: `${origin}/tarifs?checkout=cancelled`,
      metadata: {
        userId: user?.id || "anonymous",
        planKey: planKey,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err: unknown) {
    console.error("Erreur Stripe Checkout:", err);
    return NextResponse.json(
      {
        error:
          err instanceof Error
            ? err.message
            : "Une erreur est survenue lors de la création de la session Stripe.",
      },
      { status: 500 }
    );
  }
}
