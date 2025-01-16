"use client";

import { AnimatePresence } from "framer-motion";
import { FooterCTA } from "./footer";
import { SectionCTA } from "./section";

export const CTA = () => {
  return (
    <>
      <AnimatePresence mode="popLayout">
        <FooterCTA />
      </AnimatePresence>
      <SectionCTA />
    </>
  );
};
