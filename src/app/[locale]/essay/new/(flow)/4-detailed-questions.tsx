/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCreateEssayFlow } from "~/lib/create-essay-flow";
import { Button } from "~/components/ui/button";
import { experimental_useObject as useObject } from "ai/react";
import { detailedQuestionsSchema } from "~/types/schemas";
import { useRunOnce } from "~/hooks/use-run-once";
import { ActionFooter } from "../(components)/footer";
import { ArrowRight, RotateCw } from "lucide-react";
import { useMemo, useCallback, useTransition } from "react";
import { QA } from "~/components/qa";
import { TopicCard } from "~/components/topic-card";
import { TipCard } from "~/components/tip-card";

interface DetailedQuestionsProps {
  questions?: string[];
}

export function DetailedQuestions({ questions }: DetailedQuestionsProps) {
  if (!questions) {
    return <GeneratedDetailedQuestions />;
  }

  return <FixedDetailedQuestions questions={questions} />;
}

function GeneratedDetailedQuestions() {
  const {
    prompt,
    selectedTopic,
    nextStep,
    updateData,
    detailedQuestions,
    type,
  } = useCreateEssayFlow();

  const { object, submit } = useObject({
    api: "/api/generate-detailed-questions",
    schema: detailedQuestionsSchema,
    onFinish: (data) => {
      updateData({
        detailedQuestions:
          (data?.object?.questions?.filter(Boolean) as string[]) || [],
      });
    },
  });

  const [isRegenerating, startRegeneratingTransition] = useTransition();

  const questions = detailedQuestions.length
    ? detailedQuestions
    : object?.questions || [];

  const handleComplete = () => {
    nextStep();
  };

  const handleRegenerate = () => {
    updateData({ detailedQuestions: [] });
    startRegeneratingTransition(() =>
      submit({ prompt, type, topic: selectedTopic })
    );
  };

  useRunOnce(() => {
    if (!detailedQuestions.length) {
      submit({ prompt, type, topic: selectedTopic });
    }
  }, [prompt, selectedTopic, detailedQuestions]);

  return (
    <div className="flex flex-col gap-3">
      <TipCard />
      <TopicCard
        topic={selectedTopic || ""}
        generated={type === "PERSONAL_STATEMENT"}
      />

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
          disabled={!questions.length}
        >
          Generate Essay
          <ArrowRight className="w-4 h-4 text-neutral-500" />
        </Button>
      </ActionFooter>
    </div>
  );
}

interface FixedDetailedQuestionsProps {
  questions: string[];
}

function FixedDetailedQuestions({ questions }: FixedDetailedQuestionsProps) {
  const { nextStep, selectedTopic } = useCreateEssayFlow();

  const handleComplete = () => {
    nextStep();
  };

  return (
    <div className="flex flex-col gap-3">
      <TipCard />
      <TopicCard topic={selectedTopic || ""} />
      <div className="flex flex-col gap-1">
        {questions.filter(Boolean).map((question, index) => (
          <Question key={index} question={question as string} />
        ))}
      </div>

      <ActionFooter>
        <Button
          className="h-8 gap-1 rounded-full pl-2 pr-3"
          onClick={handleComplete}
          disabled={!questions.length}
        >
          Generate Essay
          <ArrowRight className="w-4 h-4 text-neutral-500" />
        </Button>
      </ActionFooter>
    </div>
  );
}

interface QuestionProps {
  question: string;
}

const Question = ({ question }: QuestionProps) => {
  const { updateData, detailedAnswers } = useCreateEssayFlow();

  const answer = useMemo(
    () => detailedAnswers[question],
    [detailedAnswers, question]
  );

  const handleChange = useCallback(
    (answer: string) => {
      updateData({
        detailedAnswers: { ...detailedAnswers, [question]: answer },
      });
    },
    [detailedAnswers, question]
  );

  return <QA question={question} answer={answer} onChange={handleChange} />;
};
