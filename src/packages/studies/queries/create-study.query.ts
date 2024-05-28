import { useQuery } from 'react-query';
import { StudyQueryKey } from '../enums';
import { studiesApi } from '../studies.api';

const useCreateStudy = () => {
  return useQuery(StudyQueryKey.CREATE_STUDY, studiesApi.createStudy);
};

export { useCreateStudy };
