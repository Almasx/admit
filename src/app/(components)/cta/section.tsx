"use client";

import { motion } from "framer-motion";
import { ArrowRightIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { usePostHog } from "posthog-js/react";
import { useCallback } from "react";
import { CTA_LINK } from "~/const";

export const SectionCTA: React.FC = () => {
  const t = useTranslations("CTA.section");
  const posthog = usePostHog();

  const handleAnalytics = useCallback(() => {
    posthog.capture("cta_click", { from: "section" });
  }, [posthog]);

  return (
    <motion.div
      layoutId="cta"
      transition={{ layout: { duration: 0.3, type: "spring", bounce: 0.1 } }}
      className="relative overflow-hidden items-center rounded-3xl bg-neutral-50 p-4 md:max-w-screen-sm h-96 md:my-32 my-12 mx-4 md:mx-auto"
    >
      <div className="flex flex-col items-center pt-24">
        <h2 className="text-neutral-600 mb-12 text-pretty text-2xl md:text-3xl font-bold tracking-tight leading-tight md:leading-tight w-64  md:w-96 text-center">
          {t("title")}
        </h2>
        <motion.a
          onClick={handleAnalytics}
          layoutId="cta-link"
          href={CTA_LINK}
          className="px-2 py-1.5 relative z-10 flex gap-1 font-medium items-center tracking-tight leading-none text-white whitespace-nowrap bg-black rounded-lg"
        >
          {t("button")}
          <ArrowRightIcon size={16} />
        </motion.a>

        <img src="/no-essay.svg" className="absolute inset-x-auto  bottom-0" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-neutral-50 z-10" />
      </div>
    </motion.div>
  );
};
