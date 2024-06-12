import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '../stores/auth.store';
import { authApi } from '@/packages/auth';
import { AppQueryKey } from '../enums';

const useGetProfile = () => {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const accessToken = useAuthStore((state) => state.accessToken);

  return useQuery({
    enabled: Boolean(accessToken) && !user,
    queryKey: AppQueryKey.GET_PROFILE,
    queryFn: async () => {
      const response = await authApi.getProfile();
      setUser(response);
      return response;
    },
  });
};

export { useGetProfile };
