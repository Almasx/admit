import { cn } from "~/lib/utils";
import { Button } from "./button";
import { MotionProps } from "framer-motion";

type WrapperProps = React.HTMLAttributes<HTMLDivElement>;

export const Wrapper = ({ className, ...props }: WrapperProps) => {
  return (
    <div
      className={cn(
        "bg-primary-50 text-primary-900 duration-200 ease-out font-medium flex items-center justify-center gap-3 rounded-b-xl p-2 h-11 text-center tracking-tight ",
        className
      )}
      {...props}
    />
  );
};

type BannerActionProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  MotionProps;

export const Action = ({ className, ...props }: BannerActionProps) => {
  return (
    <Button
      size="sm"
      className={cn(
        "bg-primary-800 text-white rounded-lg h-7 p-1.5 font-bold hover:bg-primary-900",
        className
      )}
      {...props}
    />
  );
};

export const Banner = {
  Wrapper,
  Action,
};
