import { create } from 'zustand';
import { DiagnosticDrawerStage } from './enums';
import { ValueOf } from '@/libs/types';

type DiagnosticDrawerStagesState = {
  stagesStack: ValueOf<typeof DiagnosticDrawerStage>[];
};

type DiagnosticDrawerStagesActions = {
  navigateNext: (stage: ValueOf<typeof DiagnosticDrawerStage>) => void;
  navigateBack: (onExit: () => void) => void;
  navigateUntil: (targetStage: ValueOf<typeof DiagnosticDrawerStage>) => void;
  reset: () => void;
};

const INITIAL_STATE: DiagnosticDrawerStagesState = {
  stagesStack: [DiagnosticDrawerStage.ROOT],
};

const useDiagnosticDrawerStagesStore = create<
  DiagnosticDrawerStagesState & DiagnosticDrawerStagesActions
>()((set, get) => ({
  ...INITIAL_STATE,

  navigateNext: (stage: ValueOf<typeof DiagnosticDrawerStage>) => {
    set({ stagesStack: [...get().stagesStack, stage] });
  },
  navigateBack: (onExit) => {
    const { stagesStack } = get();

    if (stagesStack.length === 1) {
      onExit();
      return;
    }

    set({ stagesStack: stagesStack.slice(0, stagesStack.length - 1) });
  },
  navigateUntil: (targetStage: ValueOf<typeof DiagnosticDrawerStage>) => {
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

export { useDiagnosticDrawerStagesStore };
