import { DIAGNOSTICS_QUERY_KEY_PREFIX } from '../constants';

const DiagnosticQueryKey = {
  GET_ALL_DIAGNOSTICS: [DIAGNOSTICS_QUERY_KEY_PREFIX, 'getAllDiagnostics'],
  GET_DIAGNOSTIC_MODELS: [DIAGNOSTICS_QUERY_KEY_PREFIX, 'getDiagnosticModels'],
} as const;

export { DiagnosticQueryKey };
