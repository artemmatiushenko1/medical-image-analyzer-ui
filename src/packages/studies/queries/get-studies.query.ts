import { createQueryKey } from '@/libs/packages/react-query';
import { useQuery } from 'react-query';
import { StudyQueryKey } from '../enums';
import { studiesApi } from '../studies.api';
import { STUDIES_QUERY_KEY_PREFIX } from '../constants';

const useGetStudies = () => {
  return useQuery(
    createQueryKey(STUDIES_QUERY_KEY_PREFIX, StudyQueryKey.GET_ALL_STUDIES),
    studiesApi.getAllStudies,
  );
};

export { useGetStudies };
