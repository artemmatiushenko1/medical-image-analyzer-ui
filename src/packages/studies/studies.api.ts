import { wait } from '@/libs/helpers';
import { MOCK_STUDIES } from './mocks';

class StudiesApi {
  getAllStudies = () => wait(2000).then(() => MOCK_STUDIES);

  createStudy = () => wait(2000).then(() => MOCK_STUDIES[0]);
}

const studiesApi = new StudiesApi();

export { studiesApi };
