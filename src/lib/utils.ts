import { EssayType } from "@prisma/client";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
};

export const formatConversationHistory = (
  conversation: { question: string; answer: string }[]
) => {
  return conversation
    .map(
      (entry, index) =>
        `Q${index + 1}: ${entry.question}\nA${index + 1}: ${entry.answer}`
    )
    .join("\n\n");
};

type CreateEssayPromptArgs = {
  prompt: string | null;
  topic: string | null;
  answers: Record<string, string>;
  type: EssayType | null;
  wordLimit?: number;
};

export const createEssayPrompt = ({
  prompt,
  topic,
  answers,
  type,
  wordLimit,
}: CreateEssayPromptArgs) => {
  const formattedAnswers = Object.entries(answers)
    .map(([q, a]) => `Q: ${q}\nA: ${a}`)
    .join("\n\n");

  if (type === "SUPPLEMENTAL") {
    return {
      role: "user" as const,
      content: `Write a supplemental essay based on the following:

Common App Prompt: "${prompt}"

Selected Topic: "${topic}"

Word Limit: ${wordLimit}

Student's detailed responses:
${formattedAnswers}

Write a compelling supplemental essay that:
1. Complements the main application essay
2. Highlights unique aspects of the student's personality or experiences
3. Provides additional context or information not covered in the main essay
4. Demonstrates the student's interest in and fit for the specific college
5. Uses a clear and concise narrative
6. Maintains an authentic and engaging voice
7. Stays within the word limit specified by the college

    The essay should be insightful, focused, and add value to the student's overall application.`,
    };
  }

  if (type === "RECOMMENDATION") {
    return {
      role: "user" as const,
      content: `Write a recommendation letter based on the following:

Student's detailed responses:
${formattedAnswers}

Write a compelling recommendation letter that:
1. Highlights the student's strengths and achievements
2. Provides specific examples of the student's skills and character
3. Demonstrates the student's potential for success in college
4. Uses a clear and professional tone
5. Maintains an authentic and supportive voice
6. Stays within the word limit specified by the college

    The recommendation letter should be insightful, supportive, and provide a strong endorsement of the student's abilities and potential.`,
    };
  }

  return {
    role: "user" as const,
    content: `Write a college application essay based on the following:

Common App Prompt: "${prompt}"

Selected Topic: "${topic}"

Student's detailed responses:
${formattedAnswers}

Word Limit: ${wordLimit}
Write a compelling college application essay that:
1. Directly addresses the Common App prompt
2. Focuses on the selected topic
3. Incorporates specific details and reflections from the student's answers
4. Shows personal growth and self-awareness
5. Uses a clear narrative structure
6. Maintains an authentic voice
7. Stays within 500-650 words

  The essay should be engaging, personal, and showcase the student's character and experiences.`,
  };
};

export const createRegenerateEssayPrompt = () => {
  return {
    role: "user" as const,
    content: `Regenerate the essay with the same prompt, topic, and answers.`,
  };
};
