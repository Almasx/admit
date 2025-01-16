import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { FAQSection } from "../(components)/section-faq";
import { FeaturesSection } from "../(components)/section-features";
import { CTA } from "../(components)/cta";
import { Main } from "../(components)/main";

export default async function HomePage() {
  const user = await currentUser();

  if (user) {
    const userTier = user.publicMetadata.planTier;
    if (!userTier || userTier !== "TIER0") {
      redirect("/essay");
    }
  }

  return (
    <div className="w-screen">
      <Main />
      <FeaturesSection />
      <FAQSection />
      <CTA />
    </div>
  );
}
