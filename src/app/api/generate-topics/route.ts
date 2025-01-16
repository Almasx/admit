import { auth } from "@clerk/nextjs/server";
import { streamObject } from "ai";
import { openaiClient } from "~/server/openai";
import { topicsGenerationSchema } from "~/types/schemas";

export const POST = async (req: Request) => {
  const { userId } = await auth();
  if (!userId) return new Response("Unauthorized", { status: 401 });

  const body = await req.json();
  const { prompt, answers } = body;

  const formattedAnswers = Object.entries(answers)
    .map(([q, a]) => `Q: ${q}\nA: ${a}`)
    .join("\n\n");

  const result = await streamObject({
    model: openaiClient,
    schema: topicsGenerationSchema,
    prompt: `
      Given the Common App prompt: "${prompt}"
      
      And the student's answers to our questions:
      ${formattedAnswers}
      
      Generate 3 distinct, compelling essay topics that:
      1. Connect directly to the prompt requirements
      2. Draw from the specific experiences and reflections shared
      3. Offer a unique angle or perspective
      4. Promise an engaging narrative
      
      Each topic should be concise (1-2 sentences) but specific enough to guide essay writing.
    `,
  });

  return result.toTextStreamResponse();
};
