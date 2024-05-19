import { MOCK_STUDIES } from './mocks';
import { Study } from './types';

class StudiesApi {
  getAllStudies = () =>
    new Promise<Study[]>((resolve) =>
      setTimeout(() => resolve(MOCK_STUDIES), 2000),
    );

  createStudy = () =>
    new Promise((resolve) => setTimeout(() => resolve(undefined), 2000));
}

const studiesApi = new StudiesApi();

export { studiesApi };
