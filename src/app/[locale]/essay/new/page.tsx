"use client";

import { useCreateEssayFlow } from "~/lib/create-essay-flow";
import { Questions } from "./(flow)/2-questions";
import { Topics } from "./(flow)/3-topics";
import { DetailedQuestions } from "./(flow)/4-detailed-questions";
import { Essay } from "./(flow)/5-essay";
import { Prompt } from "./(flow)/1-prompt";
import { Header } from "./(components)/header";
import { RECOMMENDATION_QUESTIONS } from "~/const";
import { motion } from "framer-motion";
import { Spinner } from "~/components/ui/spinner";
import { useHasHydrated } from "~/hooks/use-hydrated";

export default function CreateEssay() {
  const { step, type } = useCreateEssayFlow((state) => state);
  const isHydrated = useHasHydrated();

  if (!isHydrated) {
    return <CreateEssayLoader />;
  }

  return (
    <div className="w-full px-4 md:w-[448px] md:px-0">
      <Header />
      {type === "PERSONAL_STATEMENT" && (
        <>
          {step === "prompt" && <Prompt />}
          {step === "questions" && <Questions />}
          {step === "topics" && <Topics />}
          {step === "details" && <DetailedQuestions />}
          {step === "essay" && <Essay />}
        </>
      )}

      {type === "SUPPLEMENTAL" && (
        <>
          {step === "details" && <DetailedQuestions />}
          {step === "essay" && <Essay />}
        </>
      )}

      {type === "RECOMMENDATION" && (
        <>
          {step === "details" && (
            <DetailedQuestions questions={RECOMMENDATION_QUESTIONS} />
          )}
          {step === "essay" && <Essay />}
        </>
      )}
    </div>
  );
}

const CreateEssayLoader = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="w-[448px] h-32 gap-3 font-medium text-neutral-500 text-lg tracking-tight bg-[#EFEFEF] shadow-[0_0_10px_0_rgba(234,234,234,1)_inset] rounded-3xl flex items-center justify-center"
    >
      <Spinner color="gray" size={24} /> Loading page content
    </motion.div>
  );
};
