import { useQuery } from 'react-query';
import { usersApi } from '../users.api';
import { UsersQueryKey } from '../enums';

const useGetAllUsers = () => {
  return useQuery(UsersQueryKey.GET_ALL_USERS, usersApi.getAllUsers);
};

export { useGetAllUsers };
