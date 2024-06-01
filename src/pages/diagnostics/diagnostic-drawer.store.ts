import { create } from 'zustand';
import { ValueOf } from '@/libs/types';
import { Diagnostic, Model } from '@/packages/diagnostics';
import { DiagnosticDrawerStage } from './libs/enums';

type DiagnosticDrawerState = {
  stagesStack: ValueOf<typeof DiagnosticDrawerStage>[];
  selectedModel: Model | null;
  selectedDiagnostic: Diagnostic | null;
};

type DiagnosticDrawerActions = {
  setSelectedModel: (model: Model | null) => void;
  setSelectedDiagnostic: (model: Diagnostic | null) => void;
  navigateToNextStage: (stage: ValueOf<typeof DiagnosticDrawerStage>) => void;
  navigateToPreviousStage: (onExit?: () => void) => void;
  navigateUntilStage: (
    targetStage: ValueOf<typeof DiagnosticDrawerStage>,
  ) => void;
  resetStages: () => void;
};

const INITIAL_STATE: DiagnosticDrawerState = {
  stagesStack: [DiagnosticDrawerStage.ROOT],
  selectedModel: null,
  selectedDiagnostic: null,
};

/** TODO: split into slices */
const useDiagnosticDrawerStore = create<
  DiagnosticDrawerState & DiagnosticDrawerActions
>()((set, get) => ({
  ...INITIAL_STATE,

  /* ----- common ----- */
  setSelectedModel: (model: Model | null) => {
    set({ selectedModel: model });
  },
  setSelectedDiagnostic: (diagnostic: Diagnostic | null) => {
    set({ selectedDiagnostic: diagnostic });
  },

  /* ----- stages navigation ----- */
  navigateToNextStage: (stage: ValueOf<typeof DiagnosticDrawerStage>) => {
    set({ stagesStack: [...get().stagesStack, stage] });
  },
  navigateToPreviousStage: (onExit) => {
    const { stagesStack } = get();

    if (stagesStack.length === 1) {
      onExit?.();
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
