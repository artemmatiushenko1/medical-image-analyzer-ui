import { httpClient } from '@/libs/packages/http';
import { UsersApi } from './users.api';

const usersApi = new UsersApi(httpClient);

export { type User, type AddUserRequest } from './types';
export { Role } from './enums';
export { useAddUser, useGetAllUsers } from './queries';
export { usersApi };
