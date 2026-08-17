import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    if (webhookSecret && signature) {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } else {
      event = JSON.parse(body);
    }
  } catch (err: unknown) {
    console.error("Erreur signature webhook Stripe:", err);
    return NextResponse.json(
      { error: "Webhook signature verification failed" },
      { status: 400 }
    );
  }

  // Handle Stripe events
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      console.log("Paiement Stripe reçu avec succès pour session:", session.id);
      
      // Update user plan in Supabase if userId is present
      const userId = session.metadata?.userId;
      if (userId && userId !== "anonymous") {
        try {
          const supabase = await createClient();
          await supabase
            .from("companies")
            .update({
              legal_status: "Abonné Pro (Stripe)",
              updated_at: new Date().toISOString(),
            })
            .eq("owner_id", userId);
        } catch (e) {
          console.error("Erreur mise à jour Supabase après webhook:", e);
        }
      }
      break;
    }
    default:
      console.log(`Événement Stripe non traité: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
