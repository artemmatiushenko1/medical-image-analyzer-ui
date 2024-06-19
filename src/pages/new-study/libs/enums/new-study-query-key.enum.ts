import { NEW_STUDY_QUERY_KEY_PREFIX } from '../constants';

const NewStudyQueryKey = {
  GET_DIAGNOSTICS: [NEW_STUDY_QUERY_KEY_PREFIX, 'getDiagnostics'],
  GET_AVAILABLE_MODELS: [NEW_STUDY_QUERY_KEY_PREFIX, 'getAvailableModels'],
  CREATE_STUDY: [NEW_STUDY_QUERY_KEY_PREFIX, 'createStudy'],
} as const;

export { NewStudyQueryKey };
