import { create } from 'zustand';
import { Diagnostic } from './types';
import { MOCK_DIAGNOSTICS } from './mocks';

type DiagnosticsState = {
  availableDiagnostics: Diagnostic[];
};

type DiagnosticsActions = {
  fetchDiagnostics: () => Promise<void>;
};

const INITIAL_STATE: DiagnosticsState = {
  availableDiagnostics: MOCK_DIAGNOSTICS,
};

const useDiagnosticsStore = create<DiagnosticsState & DiagnosticsActions>()(
  (set) => ({
    ...INITIAL_STATE,

    fetchDiagnostics: async () => {
      set({ availableDiagnostics: MOCK_DIAGNOSTICS });
    },
  }),
);

export { useDiagnosticsStore };
