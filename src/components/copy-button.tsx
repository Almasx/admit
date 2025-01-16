import { Check, Copy } from "lucide-react";
import { useCallback, useState } from "react";
import { Button } from "./ui/button";

interface CopyButtonProps {
  text: string;
}

export const CopyButton: React.FC<CopyButtonProps> = ({ text }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    if (text) {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  }, [text]);

  const content = isCopied ? "Copied!" : "Copy";

  return (
    <Button
      className="h-8 gap-1 rounded-full pl-2 pr-3"
      onClick={handleCopy}
      disabled={!text}
    >
      {isCopied ? (
        <Check className="size-4 text-neutral-500" />
      ) : (
        <Copy className="size-4 text-neutral-500" />
      )}
      {content}
    </Button>
  );
};
