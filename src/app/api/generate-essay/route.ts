import { auth } from "@clerk/nextjs/server";
import { EssayType } from "@prisma/client";
import { AssistantResponse } from "ai";

import { env } from "~/env";
import { openaiRaw } from "~/server/openai";

export const maxDuration = 30;

const getAssistantId = (type: EssayType) => {
  if (type === "PERSONAL_STATEMENT") return env.ASSISTANT_ID_PERSONAL_STATEMENT;
  if (type === "SUPPLEMENTAL") return env.ASSISTANT_ID_SUPPLEMENTAL;
  if (type === "RECOMMENDATION") return env.ASSISTANT_ID_RECOMMENDATION;
  return env.ASSISTANT_ID_SUPPLEMENTAL;
};

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return new Response("Unauthorized", { status: 401 });

  const input: {
    threadId: string | null;
    message: string;
    type: EssayType;
  } = await req.json();

  const threadId =
    input.threadId ?? (await openaiRaw.beta.threads.create({})).id;

  const createdMessage = await openaiRaw.beta.threads.messages.create(
    threadId,
    { role: "user", content: input.message }
  );

  return AssistantResponse(
    { threadId, messageId: createdMessage.id },
    async ({ forwardStream }) => {
      const runStream = openaiRaw.beta.threads.runs.stream(threadId, {
        assistant_id: getAssistantId(input.type),
      });

      await forwardStream(runStream);
    }
  );
}
