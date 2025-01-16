/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { persist } from "zustand/middleware";

const STEPS = {
  PERSONAL_STATEMENT: [
    "prompt",
    "questions",
    "topics",
    "details",
    "essay",
  ] as const,
  SUPPLEMENTAL: ["details", "essay"] as const,
  RECOMMENDATION: ["details", "essay"] as const,
} as const;

export type EssayType = keyof typeof STEPS;
export type Step<T extends EssayType> = (typeof STEPS)[T][number];

type Status = "idle" | "loading" | "error";

interface CreateEssayState {
  type: EssayType | null;
  prompt: string | null;
  questions: string[];
  answers: Record<string, string>;
  topics: string[];
  selectedTopic: string | null;
  detailedQuestions: string[];
  detailedAnswers: Record<string, string>;
  wordLimit: number;

  step: Step<EssayType>;
  lastVisitedStep: Step<EssayType>;

  nextStep: () => void;
  previousStep: () => void;
  setType: (type: EssayType) => void;

  updateData: (data: Partial<CreateEssayState>) => void;
  status: Status;
  setStatus: (status: Status) => void;
  reset: () => void;
}

const initialState = {
  type: "PERSONAL_STATEMENT" as const,
  prompt: null,
  questions: [],
  wordLimit: 650,
  answers: {},
  selectedTopic: null,
  topics: [],
  detailedQuestions: [],
  detailedAnswers: {},
  step: "prompt" as Step<EssayType>,
  lastVisitedStep: "prompt" as Step<EssayType>,
  status: "idle" as Status,
};

export const useCreateEssayFlow = create<CreateEssayState>()(
  persist(
    (set) => ({
      ...initialState,
      setType: (type: EssayType) =>
        set({
          ...initialState,
          type,
          step: STEPS[type][0],
          lastVisitedStep: STEPS[type][0],
        }),
      nextStep: () =>
        set((state) => {
          if (!state.type) return state;

          const steps = STEPS[state.type];
          const currentIndex = steps.indexOf(state.step as any);
          const nextIndex = Math.min(currentIndex + 1, steps.length - 1);
          const nextStep = steps[nextIndex];

          return {
            step: nextStep,
            lastVisitedStep:
              steps[
                Math.max(steps.indexOf(state.lastVisitedStep as any), nextIndex)
              ],
          };
        }),
      previousStep: () =>
        set((state) => {
          if (!state.type) return state;

          const steps = STEPS[state.type];
          const currentIndex = steps.indexOf(state.step as any);
          const previousIndex = Math.max(currentIndex - 1, 0);
          return { step: steps[previousIndex] };
        }),
      updateData: (data) => set((state) => ({ ...state, ...data })),
      setStatus: (status) => set({ status }),
      reset: () => set(initialState),
    }),
    {
      name: "create-essay-storage",
    }
  )
);
