import { z } from "zod";

// Questions generation schema
export const questionsGenerationSchema = z.object({
  questions: z.array(
    z.string().describe("Question to help generate essay topics")
  ),
});

export const questionsGenerationRequestSchema = z.object({
  prompt: z.string(),
});

// Topics generation schema
export const topicsGenerationSchema = z.object({
  topics: z.array(
    z.string().describe("Potential essay topic based on answers")
  ),
});

export const topicsGenerationRequestSchema = z.object({
  prompt: z.string(),
  answers: z.record(z.string(), z.string()),
});

export type QuestionsGenerationResponse = z.infer<
  typeof questionsGenerationSchema
>;
export type QuestionsGenerationRequest = z.infer<
  typeof questionsGenerationRequestSchema
>;
export type TopicsGenerationResponse = z.infer<typeof topicsGenerationSchema>;
export type TopicsGenerationRequest = z.infer<
  typeof topicsGenerationRequestSchema
>;

export const detailedQuestionsSchema = z.object({
  questions: z.array(
    z.string().describe("Detailed follow-up question about the chosen topic")
  ),
});

export type DetailedQuestionsResponse = z.infer<typeof detailedQuestionsSchema>;

export const QASchema = z.record(z.string(), z.string());
