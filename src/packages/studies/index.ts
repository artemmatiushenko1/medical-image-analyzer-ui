import { httpClient } from '@/libs/packages/http';
import { StudiesApi } from './studies.api';

const studiesApi = new StudiesApi(httpClient);

export { StudyStatus } from './enums';
export { type Study, type CreateStudyRequest } from './types';
export { studiesApi };
