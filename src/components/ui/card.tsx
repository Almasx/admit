"use client";

import { cn } from "~/lib/utils";
import { motion, MotionProps } from "framer-motion";

type CardProps = MotionProps & React.ComponentPropsWithoutRef<"div">;

export const Card: React.FC<CardProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <motion.div
      className={cn(
        "text-left bg-white text-neutral-900 hover:scale-[1.005] ease-out duration-150 rounded-2xl p-4 font-medium tracking-tight leading-tight",
        "group-hover:bg-neutral-50 group-hover:text-neutral-600 cursor-pointer",
        "hover:!bg-white hover:!text-neutral-900",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};
