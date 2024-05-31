import { create } from 'zustand';
import { DiagnosticDrawerStage } from './enums';
import { ValueOf } from '@/libs/types';
import { Model } from '@/packages/diagnostics';

type DiagnosticDrawerState = {
  stagesStack: ValueOf<typeof DiagnosticDrawerStage>[];
  selectedModel: Model | null;
};

type DiagnosticDrawerActions = {
  setSelectedModel: (model: Model | null) => void;
  navigateToNextStage: (stage: ValueOf<typeof DiagnosticDrawerStage>) => void;
  navigateToPreviousStage: (onExit: () => void) => void;
  navigateUntilStage: (
    targetStage: ValueOf<typeof DiagnosticDrawerStage>,
  ) => void;
  resetStages: () => void;
};

const INITIAL_STATE: DiagnosticDrawerState = {
  stagesStack: [DiagnosticDrawerStage.ROOT],
  selectedModel: null,
};

const useDiagnosticDrawerStore = create<
  DiagnosticDrawerState & DiagnosticDrawerActions
>()((set, get) => ({
  ...INITIAL_STATE,
  setSelectedModel: (model: Model | null) => {
    set({ selectedModel: model });
  },

  /* ----- stages navigation ----- */
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
  resetStages: () => {
    set({ stagesStack: INITIAL_STATE.stagesStack });
  },
}));

export { useDiagnosticDrawerStore };
