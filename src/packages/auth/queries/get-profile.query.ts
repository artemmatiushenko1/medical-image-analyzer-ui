import { useQuery } from '@tanstack/react-query';
import { AuthQueryKey } from '../enums';
import { authApi } from '../auth.api';
import { useAuthStore } from '../auth.store';

const useGetProfile = () => {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const accessToken = useAuthStore((state) => state.accessToken);

  return useQuery({
    enabled: Boolean(accessToken) && !user,
    queryKey: AuthQueryKey.GET_PROFILE,
    queryFn: async () => {
      const response = await authApi.getProfile();
      setUser(response);
      return response;
    },
  });
};

export { useGetProfile };
