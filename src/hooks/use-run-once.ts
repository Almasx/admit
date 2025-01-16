import { useEffect, useRef } from "react";

export const useRunOnce = (callback: () => void, deps: unknown[]) => {
  const hasRun = useRef(false);

  useEffect(() => {
    if (!hasRun.current) {
      callback();
      hasRun.current = true;
    }
  }, deps);

  return hasRun.current;
};
