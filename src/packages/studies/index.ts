import { httpClient } from '@/libs/packages/http';
import { StudiesApi } from './studies.api';

const studiesApi = new StudiesApi(httpClient);

export { StudyStatus } from './enums';
export { type Study } from './types';
export { studiesApi };
