import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '@/app';
import { SignInRequest, authApi } from '@/packages/auth';

const useSignIn = () => {
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  return useMutation({
    mutationFn: (request: SignInRequest) => authApi.signIn(request),
    onSuccess: (response) => {
      setAccessToken(response.accessToken);
    },
  });
};

export { useSignIn };
