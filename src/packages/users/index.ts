import { UsersApi } from './users.api';

const usersApi = new UsersApi();

export { type User, type AddUserRequest } from './types';
export { Role } from './enums';
export { usersApi };
