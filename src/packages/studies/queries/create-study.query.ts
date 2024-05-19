import { createQueryKey } from '@/libs/packages/react-query';
import { NEW_STUDY_QUERY_KEY_PREFIX } from '@/pages/new-study/libs/constants';
import { useQuery } from 'react-query';
import { StudyQueryKey } from '../enums';
import { studiesApi } from '../studies.api';

const useCreateStudy = () => {
  return useQuery(
    createQueryKey(NEW_STUDY_QUERY_KEY_PREFIX, StudyQueryKey.CREATE_STUDY),
    studiesApi.createStudy,
  );
};

export { useCreateStudy };
