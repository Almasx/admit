/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCreateEssayFlow } from "~/lib/create-essay-flow";
import { Button } from "~/components/ui/button";
import { experimental_useObject as useObject } from "ai/react";
import { questionsGenerationSchema } from "~/types/schemas";
import { useRunOnce } from "~/hooks/use-run-once";
import React, { useCallback, useMemo, useTransition } from "react";
import { Card } from "~/components/ui/card";
import { ArrowRight, RotateCw } from "lucide-react";
import { QA } from "~/components/qa";
import { ActionFooter } from "../(components)/footer";
import { TipCard } from "~/components/tip-card";
export function Questions() {
  const {
    prompt,
    nextStep,
    questions: questionsData,
    updateData,
  } = useCreateEssayFlow();

  const { object, submit } = useObject({
    api: "/api/generate-questions",
    schema: questionsGenerationSchema,

    onFinish: (data) => {
      updateData({
        questions: (data?.object?.questions?.filter(Boolean) as string[]) || [],
      });
    },
  });

  const [isRegenerating, startRegeneratingTransition] = useTransition();

  const questions = questionsData.length
    ? questionsData
    : object?.questions || [];

  const handleComplete = () => {
    nextStep();
  };

  const handleRegenerate = () => {
    updateData({ questions: [] });
    startRegeneratingTransition(() => submit({ prompt }));
  };

  useRunOnce(() => {
    if (!questionsData.length) {
      submit({ prompt });
    }
  }, [questionsData, prompt]);

  return (
    <div className="flex flex-col gap-3">
      <TipCard />
      <Card>{prompt}</Card>

      <div className="flex flex-col gap-1">
        {questions.filter(Boolean).map((question, index) => (
          <Question key={index} question={question as string} />
        ))}
      </div>

      <ActionFooter>
        <Button
          className="h-8 gap-1 rounded-full pl-2 pr-3 group"
          loading={isRegenerating}
          loadingText="Regenerating..."
          onClick={handleRegenerate}
        >
          <RotateCw className="w-4 h-4 text-neutral-500 group-hover:rotate-[360deg] duration-300 ease-out" />
          Regenerate
        </Button>
        <Button
          className="h-8 gap-1 rounded-full pl-2 pr-3"
          onClick={handleComplete}
        >
          Generate Topics
          <ArrowRight className="w-4 h-4 text-neutral-500" />
        </Button>
      </ActionFooter>
    </div>
  );
}

interface QuestionProps {
  question: string;
}

const Question: React.FC<QuestionProps> = ({ question }) => {
  const { updateData, answers } = useCreateEssayFlow();

  const answer = useMemo(() => answers[question], [answers, question]);

  const handleChange = useCallback(
    (answer: string) => {
      updateData({ answers: { ...answers, [question]: answer } });
    },
    [answers, question]
  );

  return <QA question={question} answer={answer} onChange={handleChange} />;
};
