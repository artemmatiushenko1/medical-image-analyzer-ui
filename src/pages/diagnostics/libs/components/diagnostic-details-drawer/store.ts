import { create } from 'zustand';
import { DiagnosticDrawerStage } from './enums';
import { ValueOf } from '@/libs/types';

type DiagnosticDrawerState = {
  stagesStack: ValueOf<typeof DiagnosticDrawerStage>[];
};

type DiagnosticDrawerActions = {
  navigateToNextStage: (stage: ValueOf<typeof DiagnosticDrawerStage>) => void;
  navigateToPreviousStage: (onExit: () => void) => void;
  navigateUntilStage: (
    targetStage: ValueOf<typeof DiagnosticDrawerStage>,
  ) => void;
  reset: () => void;
};

const INITIAL_STATE: DiagnosticDrawerState = {
  stagesStack: [DiagnosticDrawerStage.ROOT],
};

const useDiagnosticDrawerStore = create<
  DiagnosticDrawerState & DiagnosticDrawerActions
>()((set, get) => ({
  ...INITIAL_STATE,

  navigateToNextStage: (stage: ValueOf<typeof DiagnosticDrawerStage>) => {
    set({ stagesStack: [...get().stagesStack, stage] });
  },
  navigateToPreviousStage: (onExit) => {
    const { stagesStack } = get();

    if (stagesStack.length === 1) {
      onExit();
      return;
    }

    set({ stagesStack: stagesStack.slice(0, stagesStack.length - 1) });
  },
  navigateUntilStage: (targetStage: ValueOf<typeof DiagnosticDrawerStage>) => {
    const stagesStack = [...get().stagesStack];

    let currentStage = stagesStack.at(-1);

    while (currentStage !== targetStage || stagesStack.length > 1) {
      stagesStack.pop();
      currentStage = stagesStack.at(-1);
    }

    set({ stagesStack });
  },
  reset: () => {
    set(INITIAL_STATE);
  },
}));

export { useDiagnosticDrawerStore };
