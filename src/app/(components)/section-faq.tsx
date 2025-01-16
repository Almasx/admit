"use client";

import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import React, { useState } from "react";
import { useTranslations } from "next-intl";

const XIcon = motion(X);

export const FAQSection: React.FC = () => {
  const t = useTranslations("FAQ");
  const faqData = t.raw("items") as Array<{ question: string; answer: string }>;

  return (
    <section className="flex flex-col mx-auto items-center justify-center max-w-md gap-8 md:gap-16 px-4 py-24 tracking-tight leading-none">
      <h2 className="text-neutral-600 text-center text-xl md:text-2xl font-bold">
        {t("title")}
      </h2>
      <div className="flex flex-col gap-2 w-full">
        {faqData.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </section>
  );
};

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col p-1 w-full rounded-2xl bg-neutral-50 tracking-tight leading-tight">
      <button
        className="flex gap-10 justify-between items-center p-3"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="font-medium text-neutral-500 text-left">
          {question}
        </span>
        <span className="flex shrink-0 justify-center items-center size-5 bg-black/5 text-neutral-400 hover:bg-black/10 duration-150 ease-out rounded-full">
          <XIcon
            size={16}
            animate={{ rotate: isOpen ? 0 : 45 }}
            transition={{ duration: 0.2 }}
          />
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: "auto", marginTop: 4 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <motion.div className="p-4 font-medium bg-white rounded-xl leading-snug">
              {answer}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
