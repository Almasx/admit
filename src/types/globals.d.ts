export {};

import { PricingType, PlanTier } from "~/features/pricing";

declare global {
  interface CustomJwtSessionClaims {
    privateMetadata: {
      stripeCustomerId: string;
    };
    publicMetadata: {
      planTier: PlanTier;
      planPeriod?: PricingType;
    };
  }
  interface UserPublicMetadata {
    planTier: PlanTier;
    planPeriod?: PricingType;
  }
  interface UserPrivateMetadata {
    stripeCustomerId: string;
  }
}
