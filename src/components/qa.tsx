import { TextArea } from "./ui/text-area";

interface QAProps {
  question: string;
  answer?: string;
  onChange?: (answer: string) => void;
}

export const QA = ({ question, answer, onChange }: QAProps) => {
  const handleChange = onChange || (() => {});

  return (
    <div className="p-2 bg-neutral-200 rounded-xl flex gap-3 items-start font-medium tracking-tight leading-tight">
      <div className="flex flex-col gap-12 pb-1">
        <label className="text-neutral-500">{question}</label>
        <TextArea
          value={answer}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Type here your answer..."
        />
      </div>
    </div>
  );
};
