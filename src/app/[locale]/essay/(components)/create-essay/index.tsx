"use client";

import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Card } from "~/components/ui/card";
import { EssayType, useCreateEssayFlow } from "~/lib/create-essay-flow";
import { StartEssay } from "./1-start";
import { ChooseEssayType } from "./2-choose";
import { SupplementalEssay } from "./3-supplemental";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { ArrowRight } from "lucide-react";

export enum steps {
  start = "start",
  essayType = "essay-type",
  supplementalDetails = "supplemental-details",
}

interface CreateEssayProps {
  onBoarding?: boolean;
  disabled?: boolean;
}

export const CreateEssay: React.FC<CreateEssayProps> = ({
  onBoarding,
  disabled,
}) => {
  const [step, setStep] = useState<steps>(steps.start);
  const { setType, updateData } = useCreateEssayFlow();
  const router = useRouter();

  const handleStepChange = () => {
    if (step === steps.start) setStep(steps.essayType);
  };

  const handleTypeClick = (type: EssayType) => {
    setType(type);

    if (type === "SUPPLEMENTAL") {
      setStep(steps.supplementalDetails);
      return;
    }

    if (type === "RECOMMENDATION") {
      updateData({
        selectedTopic: "Recommendation Letter",
        prompt: "Recommendation Letter Prompt",
      });
    }

    router.push("/essay/new");
  };

  if (disabled)
    return (
      <Card className="relative group overflow-clip shadow-sm  p-0 pt-16 w-full gap-2 h-[320px] bg-primary-50 rounded-3xl items-center  flex flex-col hover:!bg-primary-50">
        <h2 className="text-primary-800  leading-tight text-xl mb-2 tracking-tight font-bold mx-4 text-center text-pretty">
          Need more essay? With Pro plan, you can create unlimited essays.
        </h2>
        <Link href="/pricing">
          <Button>
            Upgrade to Pro <ArrowRight />
          </Button>
        </Link>
      </Card>
    );

  return (
    <Card
      onClick={handleStepChange}
      className="relative group overflow-clip shadow-sm p-0 pt-16 w-full gap-2 h-[320px] bg-[#EFEFEF] rounded-3xl items-center  flex flex-col hover:!bg-[#EFEFEF]"
    >
      <StartEssay step={step} onBoarding={onBoarding} />
      <AnimatePresence mode="popLayout">
        {step === steps.essayType && (
          <ChooseEssayType handleTypeClick={handleTypeClick} />
        )}
        {step === steps.supplementalDetails && <SupplementalEssay />}
      </AnimatePresence>
    </Card>
  );
};
