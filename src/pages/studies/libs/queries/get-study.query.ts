import { studiesApi } from '@/packages/studies';
import { useQuery } from '@tanstack/react-query';
import { StudyQueryKey } from '../enums';

const useGetStudy = (studyId: string, enabled = true) => {
  return useQuery({
    enabled,
    queryKey: [...StudyQueryKey.GET_STUDY, studyId],
    queryFn: () => studiesApi.getStudy(studyId),
  });
};

export { useGetStudy };
