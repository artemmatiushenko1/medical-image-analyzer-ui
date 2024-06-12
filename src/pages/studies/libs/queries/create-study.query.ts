import { useQuery } from '@tanstack/react-query';
import { StudyQueryKey } from '../enums';
import { studiesApi } from '@/packages/studies';

const useCreateStudy = () => {
  return useQuery({
    queryKey: StudyQueryKey.CREATE_STUDY,
    queryFn: studiesApi.createStudy,
  });
};

export { useCreateStudy };
