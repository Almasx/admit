/* eslint-disable @next/next/no-img-element */
"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "~/components/ui/button";
import clsx from "clsx";
import { steps } from ".";

interface StartEssayProps {
  step: steps;
  onBoarding?: boolean;
}

export const StartEssay: React.FC<StartEssayProps> = ({ step, onBoarding }) => {
  const content = onBoarding ? "No essays yet" : "Start Writing";

  return (
    <>
      <p className="text-neutral-400 group-hover:text-neutral-500 duration-200 ease-out text-2xl tracking-tight whitespace-nowrap font-bold">
        {content}
      </p>
      {step === steps.start && (
        <Button
          layoutId="essay-type"
          className="h-8 bg-white px-2 shrink-0  group-hover:ring-2 ring-neutral-300 "
        >
          Create Essay <ArrowRight />
        </Button>
      )}
      <img
        src={onBoarding ? "/no-essay.svg" : "/create-essay.svg"}
        alt="Empty state"
        className={clsx(
          "mt-auto duration-200 ease-out",
          !onBoarding && "translate-y-16 group-hover:translate-y-10",
          step !== steps.start && !onBoarding && "translate-y-10"
        )}
      />
    </>
  );
};
