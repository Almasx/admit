import { auth } from "@clerk/nextjs/server";
import { EssayType } from "@prisma/client";
import { streamObject } from "ai";
import { openaiClient } from "~/server/openai";
import { detailedQuestionsSchema } from "~/types/schemas";

const getPrompt = (type: Omit<EssayType, "RECOMMENDATION">, prompt: string) => {
  switch (type) {
    case "PERSONAL_STATEMENT":
      return `Given the Common App prompt: "${prompt}"`;
    case "SUPPLEMENTAL":
      return `Given the following supplemental essay prompt: "${prompt}"`;
    default:
      return `Given the Common App prompt: "${prompt}"`;
  }
};

export const POST = async (req: Request) => {
  const { userId } = await auth();
  if (!userId) return new Response("Unauthorized", { status: 401 });

  const body = await req.json();
  const { prompt, type, topic } = body;

  const result = await streamObject({
    model: openaiClient,
    schema: detailedQuestionsSchema,
    prompt: `
      ${getPrompt(type, prompt)}
      And the student's chosen topic: "${topic}"
      
      Generate 5-7 specific, detailed questions that will help gather more information about this topic. The questions should:
      
      1. Focus on concrete details and examples
      2. Ask about specific moments, feelings, and reflections
      3. Help uncover the deeper meaning and impact of the experience
      4. Guide towards gathering rich material for the essay
      
      Each question should be targeted and help draw out compelling narrative details.
    `,
  });

  return result.toTextStreamResponse();
};
