import { AddUserRequest, usersApi } from '@/packages/users';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UsersQueryKey } from '../enums';

const useAddUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: AddUserRequest) => usersApi.addUser(request),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: UsersQueryKey.GET_ALL_USERS }),
  });
};

export { useAddUser };
