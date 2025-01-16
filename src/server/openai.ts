import { openai } from "@ai-sdk/openai";
import { env } from "~/env";
import { OpenAI } from "openai";

export const openaiClient = openai("gpt-4o-mini");
export const openaiRaw = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});
