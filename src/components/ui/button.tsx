"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { AnimatePresence, motion, MotionProps } from "framer-motion";

import { cn } from "~/lib/utils";
import { Spinner } from "./spinner";

const animation = { type: "spring", duration: 0.3, bounce: 0 };

const buttonVariants = cva(
  "inline-flex items-center tracking-tighter overflow-hidden justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 dark:focus-visible:ring-neutral-300",
  {
    variants: {
      variant: {
        default:
          "bg-white text-neutral-900 hover:bg-neutral-50 dark:bg-neutral-900 dark:text-neutral-50 dark:hover:bg-neutral-800",
        destructive:
          "bg-red-500 text-neutral-50 hover:bg-red-500/90 dark:bg-red-900 dark:text-neutral-50 dark:hover:bg-red-900/90",
        outline:
          "border border-neutral-200 bg-white  hover:bg-neutral-100 hover:text-neutral-900 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:bg-neutral-800 dark:hover:text-neutral-50",
        secondary:
          "bg-neutral-100 text-neutral-900  hover:bg-neutral-100/80 dark:bg-neutral-800 dark:text-neutral-50 dark:hover:bg-neutral-800/80",
        ghost:
          "hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-neutral-50",
        link: "text-neutral-900 underline-offset-4 hover:underline dark:text-neutral-50",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8  px-2",
        lg: "h-10  px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  loadingText?: string;
}
const Button = React.forwardRef<HTMLButtonElement, ButtonProps & MotionProps>(
  (
    {
      className,
      variant,
      size,
      children,
      asChild = false,
      loading = false,
      loadingText = "Loading...",
      ...props
    },
    ref
  ) => {
    if (asChild) {
      return (
        <Slot
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        />
      );
    }

    const content = () => {
      if (loading) {
        return (
          <>
            <Spinner size={14} color="rgba(0, 0, 0, 0.65)" />
            {loadingText}
          </>
        );
      }
      return children;
    };

    return (
      <motion.button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            transition={animation}
            className="flex items-center justify-center gap-2"
            initial={{ opacity: 0, y: -25, filter: "blur(5px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 25, filter: "blur(5px)" }}
            key={loading ? "loading" : "default"}
          >
            {content()}
          </motion.span>
        </AnimatePresence>
      </motion.button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
