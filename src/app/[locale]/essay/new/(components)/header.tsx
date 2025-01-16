import { EssayType, useCreateEssayFlow } from "~/lib/create-essay-flow";
import { HEADER_TEXT } from "~/const";
import { Undo2, ArrowRight, Home } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { spring } from "~/lib/animations";
import Link from "next/link";
import { Step } from "~/lib/create-essay-flow";

const showBackButton = (step: Step<EssayType>, type: EssayType | null) => {
  if (type === "PERSONAL_STATEMENT") return step !== "prompt";
  return step !== "details";
};

export function Header() {
  const { step, lastVisitedStep, nextStep, previousStep, type } =
    useCreateEssayFlow((state) => state);

  const canProceed = step !== lastVisitedStep;

  return (
    <motion.div
      layout
      className="flex gap-2.5 mb-4 text-neutral-500"
      transition={spring}
    >
      <AnimatePresence mode="popLayout">
        {showBackButton(step, type) && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={spring}
            className="bg-[#EFEFEF] rounded-full flex items-center justify-center size-8"
            onClick={previousStep}
          >
            <Undo2 className="w-4 h-4" />
          </motion.button>
        )}
      </AnimatePresence>

      <motion.div
        layout
        transition={spring}
        className="overflow-hidden mb-auto bg-[#EFEFEF] rounded-full tracking-tighter leading-4 flex mr-auto items-center px-2 h-8 w-fit font-medium"
      >
        <AnimatePresence mode="popLayout">
          <motion.span
            key={step}
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
            transition={spring}
          >
            {HEADER_TEXT[step as keyof typeof HEADER_TEXT]}
          </motion.span>
        </AnimatePresence>
      </motion.div>

      <Link
        href="/essay"
        className="flex justify-center items-center hover:text-black bg-[#EFEFEF] rounded-full size-8 hover:bg-white duration-150 ease-out"
      >
        <Home className="size-4" />
      </Link>

      <AnimatePresence mode="popLayout">
        {canProceed && (
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={spring}
            className="bg-white rounded-full justify-center flex items-center tracking-tighter gap-1.5 p-1 px-2 pl-2.5 font-medium shrink-0"
            onClick={nextStep}
          >
            Proceed
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
