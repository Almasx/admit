import { Sparkles } from "lucide-react";
import { cn } from "~/lib/utils";

interface TopicCardProps {
  topic: string;
  generated?: boolean;
}

export const TopicCard = ({ topic, generated }: TopicCardProps) => {
  const subheading = generated ? "Generated topic" : "Topic";

  return (
    <div
      className={cn(
        "flex flex-col gap-3 rounded-2xl p-2 pb-3 duration-200 ease-out hover:scale-[1.01]",
        generated ? "bg-[#F9FF9F] hover:bg-[#f7ff86] " : "bg-white"
      )}
    >
      <div
        className={cn(
          "flex items-center gap-1.5 rounded-xl p-1 px-2 mr-auto",
          generated
            ? "bg-[#F0F696] text-[#7D850F]"
            : "bg-neutral-100 text-neutral-500"
        )}
      >
        {generated && <Sparkles className="size-4" />}
        <p className="font-medium text-sm tracking-tight">{subheading}</p>
      </div>
      <p
        className={cn(
          "font-semibold text-lg tracking-tight leading-tight px-1",
          generated && "text-[#3E4301]"
        )}
      >
        {topic}
      </p>
    </div>
  );
};
