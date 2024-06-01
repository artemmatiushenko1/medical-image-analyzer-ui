import { useQuery } from '@tanstack/react-query';
import { usersApi } from '../users.api';
import { UsersQueryKey } from '../enums';

const useGetAllUsers = () => {
  return useQuery({
    queryKey: UsersQueryKey.GET_ALL_USERS,
    queryFn: usersApi.getAllUsers,
  });
};

export { useGetAllUsers };
