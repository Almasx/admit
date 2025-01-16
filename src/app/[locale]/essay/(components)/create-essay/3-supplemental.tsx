import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { TextArea } from "~/components/ui/text-area";
import { useCreateEssayFlow } from "~/lib/create-essay-flow";

export const SupplementalEssay: React.FC = () => {
  const { updateData, setType } = useCreateEssayFlow();
  const [university, setUniversity] = useState("");
  const [prompt, setPrompt] = useState("");
  const [wordLimit, setWordLimit] = useState<number>();
  const router = useRouter();

  const handleCreate = () => {
    setType("SUPPLEMENTAL");
    updateData({
      wordLimit: wordLimit ?? 650,
      prompt: university,
      selectedTopic: prompt,
    });
    router.push("/essay/new");
  };

  return (
    <>
      <div className="absolute inset-0 bg-neutral-200/20 backdrop-blur-sm "></div>
      <motion.div
        layoutId="essay-type"
        initial={{ y: 320, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, type: "spring", bounce: 0 }}
        className="flex flex-col absolute inset-0 p-2 gap-1.5 pt-3"
      >
        <div className="flex gap-1">
          <Input
            placeholder="University name"
            className="text-base tracking-tighter placeholder:opacity-100"
            value={university}
            onChange={(e) => setUniversity(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Word limit"
            className="text-base tracking-tighter placeholder:opacity-100 w-28 px-2"
            value={wordLimit}
            onChange={(e) => setWordLimit(parseInt(e.target.value))}
          />
        </div>
        <TextArea
          placeholder={`Paste your essay \nprompt here...`}
          className="grow bg-neutral-50 rounded-xl p-4 tracking-tighter leading-5 overflow-y-auto overflow-x-hidden"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <Button
          className="rounded-xl mt-1 shrink-0 text-base"
          onClick={handleCreate}
        >
          Create Supplemental Essay <ArrowRight className="text-neutral-500" />
        </Button>
      </motion.div>
    </>
  );
};
