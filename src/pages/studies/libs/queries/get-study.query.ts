import { studiesApi } from '@/packages/studies';
import { useMutation, useQuery } from '@tanstack/react-query';
import { StudyQueryKey } from '../enums';

const useGetStudy = (studyId: string | null, enabled = true) => {
  return useQuery({
    queryKey: [...StudyQueryKey.GET_STUDY, studyId],
    queryFn: () => (studyId ? studiesApi.getStudy(studyId) : undefined),
    enabled,
  });
};

const useGetStudyMutation = () => {
  return useMutation({
    mutationKey: StudyQueryKey.GET_STUDY,
    mutationFn: (studyId: string) => studiesApi.getStudy(studyId),
  });
};

export { useGetStudy, useGetStudyMutation };
