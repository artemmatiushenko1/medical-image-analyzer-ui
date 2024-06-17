import { DIAGNOSTICS_QUERY_KEY_PREFIX } from '../constants';

const DiagnosticQueryKey = {
  GET_ALL_DIAGNOSTICS: [DIAGNOSTICS_QUERY_KEY_PREFIX, 'getAllDiagnostics'],
  GET_DIAGNOSTIC_MODELS: [DIAGNOSTICS_QUERY_KEY_PREFIX, 'getDiagnosticModels'],
  GET_MODEL: [DIAGNOSTICS_QUERY_KEY_PREFIX, 'getModel'],
  CHANGE_MODEL_STATUS: [DIAGNOSTICS_QUERY_KEY_PREFIX, 'changeModelStatus'],
  CHANGE_MODEL_VERSION_STATUS: [
    DIAGNOSTICS_QUERY_KEY_PREFIX,
    'changeModelVersionStatus',
  ],
} as const;

export { DiagnosticQueryKey };
