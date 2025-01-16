/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useRef } from "react";
import { Card } from "~/components/ui/card";
import { motion, useScroll, useTransform } from "framer-motion";
import { useBreakpoint } from "~/hooks/use-breakpoint";
import { cn } from "~/lib/utils";
import { useTranslations } from "next-intl";

export const FeaturesSection: React.FC = () => {
  const t = useTranslations("Features");
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === "base";
  const targetRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["30%", "-45%"]);

  return (
    <section
      ref={targetRef}
      className={cn(
        "relative w-screen overflow-x-clip",
        isMobile ? "h-auto py-12" : "h-[400vh]"
      )}
    >
      <div className="flex md:h-screen items-center w-full top-0 md:sticky relative">
        <div className="flex flex-col items-center w-full px-4 ">
          <h2 className="text-neutral-600 text-xl md:text-2xl font-bold tracking-tighter leading-none mb-8 md:mb-16">
            {t("title")}
          </h2>
          <motion.div
            style={isMobile ? undefined : { x }}
            className={cn("flex gap-3 p-1 flex-col md:flex-row")}
          >
            <FeatureCard className="bg-white">
              <header
                className="font-medium leading-4 text-center text-neutral-500"
                dangerouslySetInnerHTML={{ __html: t.raw("card1.title") }}
              />

              <div className="flex flex-col items-center mt-20 font-semibold leading-none">
                <div className="text-5xl line-through text-neutral-400">
                  {t("card1.oldTime")}
                </div>
                <div className="text-6xl font-bold italic tracking-tight">
                  {t("card1.newTime")}
                </div>
              </div>

              <img
                src="/la-1.svg"
                alt="essay"
                className="absolute inset-x-auto bottom-0"
              />
            </FeatureCard>

            <FeatureCard>
              <header
                className="font-medium tracking-tighter leading-4 text-center text-neutral-500"
                dangerouslySetInnerHTML={{ __html: t.raw("card2.title") }}
              />
              <div className="flex flex-col items-center mt-20 font-semibold leading-none">
                <div className="text-8xl text-center tracking-tight">
                  {t("card2.number")}
                </div>
                <div className="text-3xl text-neutral-400">
                  {t("card2.text")}
                </div>
              </div>

              <img
                src="/la-2.svg"
                alt="essay"
                className="absolute inset-x-auto bottom-0"
              />
              <div className="absolute bottom-0 h-24 bg-gradient-to-b from-transparent to-neutral-50 w-full"></div>
            </FeatureCard>

            <FeatureCard className="bg-[#F1FDFF] border-[#E1F3F8] hover:!bg-[#F1FDFF]/80">
              <header
                className="relative z-10 font-medium tracking-tighter leading-4 text-center text-neutral-500"
                dangerouslySetInnerHTML={{ __html: t.raw("card3.title") }}
              />
              <Card className="hover:bg-white size-36 flex flex-col rounded-3xl shadow-md shadow-neutral-200/20 justify-center items-center mt-auto mb-12 relative z-10 font-semibold leading-none">
                <div className="text-3xl font-semibold text-center tracking-tight mb-1">
                  {t("card3.number")}
                </div>
                <div className="text-neutral-400 leading-4 text-center text-pretty whitespace-pre-line">
                  {t("card3.text")}
                </div>
              </Card>

              <img
                src="/la-3.svg"
                alt="essay"
                className="absolute w-full inset-0 -translate-y-2"
              />
            </FeatureCard>

            <FeatureCard>
              <header
                className="font-medium tracking-tighter leading-4 text-center text-neutral-500"
                dangerouslySetInnerHTML={{ __html: t.raw("card4.title") }}
              />

              <img
                src="/la-4.svg"
                alt="essay"
                className="absolute bottom-0 inset-x-auto"
              />
            </FeatureCard>

            <FeatureCard className="bg-black hover:!bg-neutral-900">
              <header
                className="font-medium tracking-tighter leading-4 text-center text-neutral-300"
                dangerouslySetInnerHTML={{ __html: t.raw("card5.title") }}
              />
              <img
                src="/la-6.png"
                alt="glossary"
                className="mt-8 rounded-2xl scale-95"
              />
            </FeatureCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

interface FeatureCardProps {
  children: React.ReactNode;
  className?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ children, className }) => {
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === "base";

  return (
    <Card
      className={cn(
        "relative flex tracking-tight shrink-0 aspect-[3/4] leading-none overflow-hidden flex-col items-center pt-12 border border-gray-200 bg-neutral-50 rounded-[32px] shadow-sm",
        isMobile ? "w-full" : "w-[384px]",
        className
      )}
    >
      {children}
    </Card>
  );
};
