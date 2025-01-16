/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCreateEssayFlow } from "~/lib/create-essay-flow";
import { Card } from "~/components/ui/card";
import { experimental_useObject as useObject } from "ai/react";
import { topicsGenerationSchema } from "~/types/schemas";
import { useRunOnce } from "~/hooks/use-run-once";
import { ArrowRight, Plus, RotateCw } from "lucide-react";
import { Button } from "~/components/ui/button";
import { ActionFooter } from "../(components)/footer";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";

export function Topics() {
  const {
    prompt,
    answers,
    updateData,
    nextStep,
    topics: topicsData,
  } = useCreateEssayFlow();

  const { object, submit, isLoading } = useObject({
    api: "/api/generate-topics",
    schema: topicsGenerationSchema,
    onFinish: (data) => {
      setTopics((topics) => [...topics, ...(data.object?.topics || [])]);
    },
  });

  const [isRegenerating, startRegeneratingTransition] = useTransition();
  const [isAdding, startAddingTransition] = useTransition();
  const [topics, setTopics] = useState(topicsData);

  const topicsToDisplay = useMemo(
    () =>
      isRegenerating || isAdding || isLoading
        ? topics.concat((object?.topics?.filter(Boolean) as string[]) || [])
        : topics,
    [isRegenerating, isAdding, isLoading, topics, object?.topics]
  );

  const handleSubmit = useCallback(() => {
    return submit({ prompt, answers });
  }, [submit, prompt, answers]);

  const handleRegenerate = useCallback(() => {
    setTopics([]);
    updateData({ topics: [] });
    startRegeneratingTransition(() => handleSubmit());
  }, [updateData, startRegeneratingTransition, handleSubmit]);

  const handleMoreTopics = useCallback(() => {
    startAddingTransition(() => handleSubmit());
  }, [startAddingTransition, handleSubmit]);

  const handleSelectTopic = useCallback(
    (topic: string) => {
      updateData({ selectedTopic: topic });
      nextStep();
    },
    [updateData, nextStep]
  );

  useRunOnce(() => {
    if (!topicsData.length) {
      handleSubmit();
    }
  }, [topicsData, prompt, answers]);

  useEffect(() => {
    updateData({ topics });
  }, [topics]);

  return (
    <div className="flex flex-col gap-3">
      <Card>{prompt}</Card>
      <div className="flex flex-col gap-1">
        {topicsToDisplay.map((topic, index) => (
          <TopicCard
            key={index}
            topic={topic}
            onSubmit={() => handleSelectTopic(topic || "")}
          />
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
          loading={isAdding}
          loadingText="Generating..."
          onClick={handleMoreTopics}
        >
          <Plus className="w-4 h-4 text-neutral-500" />
          More topics
        </Button>
      </ActionFooter>
    </div>
  );
}

interface TopicCardProps {
  topic?: string;
  onSubmit: () => void;
}

const TopicCard = ({ topic, onSubmit }: TopicCardProps) => {
  return (
    <div className="flex flex-col gap-3 rounded-2xl p-2  bg-[#F9FF9F]">
      <p className=" text-[#3E4301] font-semibold text-lg tracking-tight leading-tight py-1">
        {topic}
      </p>
      <div className="flex gap-2 mt-3">
        <Button
          onClick={onSubmit}
          className="bg-[#3E4301] font-bold hover:bg-[#2f310f] h-8 rounded-xl p-2 pr-3 text-[#F9FF9F]"
        >
          Select topic <ArrowRight className="size-4" />
        </Button>
      </div>
    </div>
  );
};
