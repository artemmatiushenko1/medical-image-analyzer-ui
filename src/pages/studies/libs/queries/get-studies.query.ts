import { useQuery } from '@tanstack/react-query';
import { StudyQueryKey } from '../enums';
import { studiesApi } from '@/packages/studies';

const useGetStudies = () => {
  return useQuery({
    queryKey: StudyQueryKey.GET_ALL_STUDIES,
    queryFn: studiesApi.getAllStudies,
  });
};

export { useGetStudies };
