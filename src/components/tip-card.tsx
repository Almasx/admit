import { Lightbulb } from "lucide-react";
import { cn } from "~/lib/utils";

interface TipCardProps {
  tip?: string;
}

const DEFAULT_TIP =
  "The quality of the final essay depends on the quality of the questions. It is not obligatory to answer all questions, but the more questions you answer, the better the essay will be.";

export const TipCard: React.FC<TipCardProps> = ({ tip }) => {
  return (
    <div className="flex flex-col gap-2 rounded-2xl p-2 pb-3 bg-neutral-50 text-neutral-500">
      <div className="flex mb-auto items-center gap-1 rounded-xl p-1 px-2 mr-auto bg-neutral-100 text-neutral-500">
        <Lightbulb className="size-4" />
        <p className="font-medium text-sm tracking-tight">Tip</p>
      </div>
      <p className={cn("font-medium  tracking-tight leading-tight px-1")}>
        {tip || DEFAULT_TIP}
      </p>
    </div>
  );
};
