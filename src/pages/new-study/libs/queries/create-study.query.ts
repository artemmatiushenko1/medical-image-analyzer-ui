import { CreateStudyRequest, studiesApi } from '@/packages/studies';
import { useMutation } from '@tanstack/react-query';

const useCreateStudy = () => {
  return useMutation({
    mutationFn: (request: CreateStudyRequest) => {
      return studiesApi.createStudy(request);
    },
  });
};

export { useCreateStudy };
