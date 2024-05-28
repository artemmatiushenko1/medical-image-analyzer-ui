import { useMutation, useQueryClient } from 'react-query';
import { AddUserRequest } from '../types';
import { usersApi } from '../users.api';
import { UsersQueryKey } from '../enums';

const useAddUser = () => {
  const queryClient = useQueryClient();

  return useMutation((request: AddUserRequest) => usersApi.addUser(request), {
    onSuccess: () => {
      queryClient.invalidateQueries(UsersQueryKey.GET_ALL_USERS);
    },
  });
};

export { useAddUser };
