import { useMutation } from 'react-query';
import { AddUserRequest } from '../types';
import { usersApi } from '../users.api';

const useAddUser = () => {
  return useMutation((request: AddUserRequest) => usersApi.addUser(request));
};

export { useAddUser };
