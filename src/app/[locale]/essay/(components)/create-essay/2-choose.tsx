import { EssayType } from "@prisma/client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Card } from "~/components/ui/card";

interface ChooseEssayTypeProps {
  handleTypeClick: (type: EssayType) => void;
}

export const ChooseEssayType: React.FC<ChooseEssayTypeProps> = ({
  handleTypeClick,
}) => {
  return (
    <motion.div
      transition={{ duration: 0.2, type: "spring", bounce: 0 }}
      layoutId="essay-type"
      className="flex flex-col absolute inset-0 bg-neutral-200/20 backdrop-blur-sm p-2 gap-1.5 text-xl"
    >
      <Card
        className="grow flex gap-2.5 items-center justify-center tracking-tighter font-semibold text-neutral-500 group-hover:text-neutral-400"
        onClick={() => handleTypeClick("SUPPLEMENTAL")}
      >
        Supplemental Essay
        <ArrowRight className="text-neutral-500 group-hover:text-neutral-300" />
      </Card>
      <Card
        className="grow flex gap-2.5 items-center justify-center tracking-tighter font-semibold text-neutral-500 group-hover:text-neutral-400"
        onClick={() => handleTypeClick("PERSONAL_STATEMENT")}
      >
        Personal Statement
        <ArrowRight className="text-neutral-500 group-hover:text-neutral-300" />
      </Card>
      <Card
        className="grow flex gap-2.5 items-center justify-center tracking-tighter font-semibold text-neutral-500 group-hover:text-neutral-400"
        onClick={() => handleTypeClick("RECOMMENDATION")}
      >
        Recommendation Letter
        <ArrowRight className="text-neutral-500 group-hover:text-neutral-300" />
      </Card>
    </motion.div>
  );
};
