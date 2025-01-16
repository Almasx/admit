import { motion } from "framer-motion";

interface ActionFooterProps {
  children: React.ReactNode;
}

export function ActionFooter({ children }: ActionFooterProps) {
  return (
    <div className="inset-x-0 fixed mx-auto font-medium bottom-0 bg-neutral-100/80 backdrop-blur-sm w-full md:w-[448px] ">
      <motion.div
        layoutId="footer"
        transition={{ duration: 0.2, type: "spring", bounce: 0 }}
        className="flex gap-2 items-center pb-4 pt-2 justify-center size-full flex-wrap"
      >
        {children}
      </motion.div>
    </div>
  );
}
