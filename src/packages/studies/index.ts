import { httpClient } from '@/libs/packages/http';
import { StudiesApi } from './studies.api';

const studiesApi = new StudiesApi(httpClient);

export { StudyStatus } from './enums';
export {
  type Study,
  type CreateStudyRequest,
  type StudySummary,
} from './types';
export { studiesApi };
