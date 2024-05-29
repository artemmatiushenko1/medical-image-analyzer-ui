import { DIAGNOSTICS_QUERY_KEY_PREFIX } from '../constants';

const DiagnosticQueryKey = {
  GET_ALL_DIAGNOSTICS: [DIAGNOSTICS_QUERY_KEY_PREFIX, 'getAllDiagnostics'],
} as const;

export { DiagnosticQueryKey };
