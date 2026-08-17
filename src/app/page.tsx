import React from "react";
import MarketingLayout from "./(marketing)/layout";
import { LandingPageComponent } from "@/components/marketing/landing-page";

export default function HomePage() {
  return (
    <MarketingLayout>
      <LandingPageComponent />
    </MarketingLayout>
  );
}
