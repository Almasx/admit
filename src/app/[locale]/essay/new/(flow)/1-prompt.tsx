import { useCreateEssayFlow } from "~/lib/create-essay-flow";
import { cn } from "~/lib/utils";
import { Card } from "~/components/ui/card";

const COMMON_APP_PROMPTS = [
  `Some students have a background, identity, interest, or talent that is so meaningful they believe their application would be incomplete without it. If this sounds like you, then please share your story.`,
  `The lessons we take from obstacles we encounter can be fundamental to later success. Recount a time when you faced a challenge, setback, or failure. How did it affect you, and what did you learn from the experience?`,
  `Reflect on a time when you questioned or challenged a belief or idea. What prompted your thinking? What was the outcome?`,
  `Reflect on something that someone has done for you that has made you happy or thankful in a surprising way. How has this gratitude affected or motivated you?`,
  `Discuss an accomplishment, event, or realization that sparked a period of personal growth and a new understanding of yourself or others.`,
  `Describe a topic, idea, or concept you find so engaging that it makes you lose all track of time. Why does it captivate you? What or who do you turn to when you want to learn more?`,
  `Share an essay on any topic of your choice. It can be one you've already written, one that responds to a different prompt, or one of your own design.`,
];

export function Prompt() {
  const { prompt, updateData, nextStep, setType } = useCreateEssayFlow(
    (state) => state
  );

  const handleSelectPrompt = (prompt: string) => {
    setType("PERSONAL_STATEMENT");
    updateData({ prompt });
    nextStep();
  };
  console.log(prompt);

  return (
    <div className="flex flex-col gap-1.5 group ">
      {COMMON_APP_PROMPTS.map((promptItem, index) => (
        <Card
          key={index}
          onClick={() => handleSelectPrompt(promptItem)}
          className={cn(
            prompt !== null && "bg-neutral-50 text-neutral-500",
            prompt === promptItem && "bg-white text-neutral-900"
          )}
        >
          {promptItem}
        </Card>
      ))}
    </div>
  );
}
