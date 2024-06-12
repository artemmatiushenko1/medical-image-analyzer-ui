import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AddUserRequest } from '../types';
import { UsersQueryKey } from '../enums';
import { usersApi } from '..';

const useAddUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: AddUserRequest) => usersApi.addUser(request),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: UsersQueryKey.GET_ALL_USERS }),
  });
};

export { useAddUser };
