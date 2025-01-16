"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAssistant } from "ai/react";
import { useCreateEssayFlow } from "~/lib/create-essay-flow";
import { Button } from "~/components/ui/button";
import { Eye, RotateCw } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useRunOnce } from "~/hooks/use-run-once";
import { createEssayPrompt, createRegenerateEssayPrompt } from "~/lib/utils";
import Markdown from "react-markdown";
import { TopicCard } from "~/components/topic-card";
import { ActionFooter } from "../(components)/footer";
import { saveEssay } from "../essay-actions";
import { useAction } from "next-safe-action/hooks";
import Link from "next/link";
import { CopyButton } from "~/components/copy-button";

export function Essay() {
  const { type, prompt, selectedTopic, detailedAnswers, wordLimit } =
    useCreateEssayFlow();
  const [essayId, setEssayId] = useState<string>();

  const { execute: saveEssayAction } = useAction(saveEssay, {
    onSuccess: (response) => {
      if (response?.data?.essay) setEssayId(response.data.essay.id);
    },
    onError: (error) => {
      console.error("onError", error);
    },
  });

  const {
    messages,
    status: generateStatus,
    append,
  } = useAssistant({
    api: "/api/generate-essay",
    body: { type },
  });

  const essay =
    messages.filter((m) => m.role === "assistant").at(-1)?.content || "";

  const handleRegenerate = useCallback(() => {
    append(createRegenerateEssayPrompt());
  }, [append]);

  useEffect(() => {
    if (generateStatus === "awaiting_message") {
      handleSave();
    }
  }, [generateStatus]);

  const handleSave = () => {
    if (!essay || !prompt || !selectedTopic || !detailedAnswers || !type)
      return;

    saveEssayAction({
      id: essayId,
      prompt,
      topic: selectedTopic,
      content: essay,
      type,
      QA: detailedAnswers,
    });
  };

  useRunOnce(() => {
    append(
      createEssayPrompt({
        prompt,
        type,
        topic: selectedTopic,
        answers: detailedAnswers,
        wordLimit,
      })
    );
  }, []);

  return (
    <div className="flex flex-col gap-3">
      <TopicCard
        topic={selectedTopic || ""}
        generated={type === "PERSONAL_STATEMENT"}
      />

      {essay && (
        <div className="bg-white rounded-2xl p-4">
          <article className="prose  font-medium tracking-tight leading-normal text-neutral-600">
            <Markdown>{essay}</Markdown>
          </article>
        </div>
      )}

      <ActionFooter>
        <Button
          className="h-8 gap-1 rounded-full pl-2 pr-3 group"
          loading={generateStatus === "in_progress"}
          loadingText="Generating..."
          onClick={handleRegenerate}
        >
          <RotateCw className="w-4 h-4 text-neutral-500 group-hover:rotate-[360deg] duration-300 ease-out" />
          Regenerate
        </Button>
        <CopyButton text={essay} />
        {essayId && (
          <Link
            href={`/essay/${essayId}`}
            className="flex items-center gap-2 h-8 tracking-tighter text-sm rounded-full pl-2 pr-3 bg-white whitespace-nowrap shrink-0 animate-in fade-in duration-300"
          >
            <Eye className="w-4 h-4 text-neutral-500" /> View Essay
          </Link>
        )}
      </ActionFooter>
    </div>
  );
}
