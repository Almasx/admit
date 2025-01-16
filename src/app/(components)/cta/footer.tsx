"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { usePostHog } from "posthog-js/react";
import { useCallback, useState } from "react";
import { useBreakpoint } from "~/hooks/use-breakpoint";
import { CTA_LINK } from "~/const";
import { useTranslations } from "next-intl";

const THRESHOLD = 600;

export const FooterCTA: React.FC = () => {
  const t = useTranslations("CTA.footer");
  const posthog = usePostHog();

  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === "base";

  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(true);

  const content = isMobile ? t("mobile") : t("desktop");

  const handleAnalytics = useCallback(() => {
    posthog.capture("cta_click", { from: "footer" });
  }, [posthog]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const bottom =
      document.documentElement.scrollHeight - window.innerHeight - THRESHOLD;
    setIsVisible(latest < bottom);
  });

  if (!isVisible) return null;

  return (
    <div className="fixed -inset-x-0 bottom-0 flex justify-center md:h-24 h-12 z-50">
      <motion.div
        layoutId="cta"
        className="h-10 flex gap-3 justify-center items-center p-1.5 pl-3 font-medium text-center rounded-xl bg-neutral-50/70 backdrop-blur-sm border border-neutral-200/50"
        initial={{ y: isMobile ? 48 : 96 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3, type: "spring", bounce: 0.1 }}
      >
        <motion.p className="tracking-tight leading-none text-neutral-500 whitespace-nowrap">
          {content}
        </motion.p>
        <motion.a
          onClick={handleAnalytics}
          layoutId="cta-link"
          href={CTA_LINK}
          className="px-2 py-1.5 text-sm tracking-tight leading-none text-white whitespace-nowrap bg-black rounded-lg"
        >
          {t("button")}
        </motion.a>
      </motion.div>
    </div>
  );
};
