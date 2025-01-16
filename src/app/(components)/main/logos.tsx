"use client";

/* eslint-disable @next/next/no-img-element */
import { motion } from "framer-motion";
import { cn } from "~/lib/utils";

interface CollegeLogoProps {
  src: string;
  alt?: string;
  className?: string;
  index: number;
}

export const CollegeLogo: React.FC<CollegeLogoProps> = ({
  src,
  alt = src,
  className,
  index,
}) => {
  const rotate = index % 2 === 0 ? -6 : 6;

  return (
    <motion.div
      initial={{ scale: 0, rotate }}
      animate={{ scale: 1, rotate }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.1 }}
      className={cn(
        "rounded-[10px] border-2 shadow-sm border-white/10 size-8 overflow-hidden flex items-center justify-center",
        className
      )}
    >
      <img src={src} alt={alt} width={32} height={32} />
    </motion.div>
  );
};
