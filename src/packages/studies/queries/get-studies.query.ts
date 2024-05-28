import { useQuery } from 'react-query';
import { StudyQueryKey } from '../enums';
import { studiesApi } from '../studies.api';

const useGetStudies = () => {
  return useQuery(StudyQueryKey.GET_ALL_STUDIES, studiesApi.getAllStudies);
};

export { useGetStudies };
