import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '../stores/auth.store';
import { authApi } from '@/packages/auth';
import { AppQueryKey } from '../enums';

const useGetProfile = () => {
  const accessToken = useAuthStore((state) => state.accessToken);

  return useQuery({
    enabled: Boolean(accessToken),
    queryKey: AppQueryKey.GET_PROFILE,
    queryFn: () => authApi.getProfile(),
    staleTime: Infinity,
  });
};

export { useGetProfile };
