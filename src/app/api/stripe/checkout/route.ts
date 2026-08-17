import { NextResponse } from "next/server";
import { DEFAULT_SUPABASE_URL } from "@/lib/constants";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { planKey = "pro" } = body;

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const origin = req.headers.get("origin") || "https://saasjules.vercel.app";

    // Appel direct de l'Edge Function Supabase (qui contient déjà la clé STRIPE_SECRET_KEY)
    const edgeFunctionUrl = `${DEFAULT_SUPABASE_URL}/functions/v1/create-linkedin-checkout`;

    const edgeRes = await fetch(edgeFunctionUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        planKey: planKey,
        userId: user?.id || "anonymous",
        userEmail: user?.email || undefined,
        successUrl: `${origin}/dashboard?checkout=success&plan=${planKey}`,
        cancelUrl: `${origin}/tarifs?checkout=cancelled`,
      }),
    });

    const data = await edgeRes.json();

    if (!edgeRes.ok || !data.url) {
      throw new Error(
        data.error || "Impossible d'initialiser le paiement Stripe."
      );
    }

    return NextResponse.json({ url: data.url, sessionId: data.sessionId });
  } catch (err: unknown) {
    console.error("Erreur Checkout Route:", err);
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
