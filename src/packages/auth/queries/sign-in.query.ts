import { useMutation } from '@tanstack/react-query';
import { authApi } from '../auth.api';
import { SignInRequest } from '../types';
import { useAuthStore } from '../auth.store';

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
