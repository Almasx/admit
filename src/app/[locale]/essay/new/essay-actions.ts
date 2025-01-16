"use server"; // don't forget to add this!

import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import { actionClient } from "~/lib/safe-action";
import { db } from "~/server/db";
import { QASchema } from "~/types/schemas";

const schema = z.object({
  id: z.string().optional(),
  prompt: z.string(),
  topic: z.string(),
  type: z.enum(["PERSONAL_STATEMENT", "SUPPLEMENTAL", "RECOMMENDATION"]),
  content: z.string(),
  QA: QASchema,
});

const MAX_TITLE_LENGTH = 32;

const getTitle = (topic: string) => {
  return (
    topic.slice(0, MAX_TITLE_LENGTH).trim() +
    (topic.length > MAX_TITLE_LENGTH ? "..." : "")
  );
};

export const saveEssay = actionClient
  .schema(schema)
  .action(async ({ parsedInput: { id, prompt, topic, content, QA, type } }) => {
    const { userId } = await auth();

    if (!userId) {
      return { error: "Unauthorized" };
    }

    const payload = {
      title: getTitle(topic),
      prompt,
      topic,
      content,
      QA,
    };

    try {
      const user = await db.user.findFirstOrThrow({
        where: { clerkUserId: userId },
      });

      if (id) {
        const essay = await db.essay.update({
          where: { id, userId: user.id },
          data: payload,
        });
        return { essay };
      }

      const essay = await db.essay.create({
        data: {
          ...payload,
          type,
          userId: user.id,
        },
      });
      return { essay };
    } catch (error) {
      return { error };
    }
  });
