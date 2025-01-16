import { auth } from "@clerk/nextjs/server";
import { streamObject } from "ai";
import { openaiClient } from "~/server/openai";
import { questionsGenerationSchema } from "~/types/schemas";

export const POST = async (req: Request) => {
  const { userId } = await auth();
  if (!userId) return new Response("Unauthorized", { status: 401 });

  const body = await req.json();
  const { prompt } = body;

  const result = await streamObject({
    model: openaiClient,
    schema: questionsGenerationSchema,
    prompt: `
      Given the Common App prompt: "${prompt}"
      
      Generate 5-10 thought-provoking questions that will help the student explore different angles and experiences related to this prompt. The questions should:
      
      1. Help uncover specific experiences and stories
      2. Encourage reflection on personal growth
      3. Draw out meaningful details and emotions
      4. Guide towards generating compelling essay topics
      
      Each question should be specific and targeted to help generate potential essay topics.
    `,
  });

  return result.toTextStreamResponse();
};
