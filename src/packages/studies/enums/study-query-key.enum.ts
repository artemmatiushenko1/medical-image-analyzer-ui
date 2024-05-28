import { STUDIES_QUERY_KEY_PREFIX } from '../constants';

const StudyQueryKey = {
  GET_ALL_STUDIES: [STUDIES_QUERY_KEY_PREFIX, 'getAllStudies'],
  CREATE_STUDY: [STUDIES_QUERY_KEY_PREFIX, 'createStudy'],
} as const;

export { StudyQueryKey };
