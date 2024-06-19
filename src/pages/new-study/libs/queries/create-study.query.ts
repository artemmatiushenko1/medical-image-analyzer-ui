import { CreateStudyRequest, studiesApi } from '@/packages/studies';
import { StudyQueryKey } from '@/pages/studies/libs/enums';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useCreateStudy = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: CreateStudyRequest) => {
      return studiesApi.createStudy(request);
    },
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: StudyQueryKey.GET_ALL_STUDIES,
        refetchType: 'all',
      });
    },
  });
};

export { useCreateStudy };
