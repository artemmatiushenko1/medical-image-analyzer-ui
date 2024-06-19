import { authApi } from '@/packages/auth';
import { useMutation } from '@tanstack/react-query';

const useChangePassword = (onSuccess: () => void) => {
  return useMutation({
    mutationFn: (newPassword: string) => authApi.changePassword(newPassword),
    onSuccess,
  });
};

export { useChangePassword };
