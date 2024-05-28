import { Role } from '@/packages/users';
import { delayResolve } from '@/libs/helpers';
import { AddUserRequest, AddUserResponse, GetAllUsersResponse } from './types';
import { mockUsers } from './mocks';

class UsersApi {
  users = [...mockUsers];

  addUser = async (request: AddUserRequest): Promise<AddUserResponse> => {
    const user = await delayResolve<AddUserResponse>(2000, {
      ...request,
      id: crypto.randomUUID(),
      role: Role.USER,
    });
    this.users = [...this.users, user];
    return user;
  };
  getAllUsers = (): Promise<GetAllUsersResponse> =>
    delayResolve(2000, this.users);
}

const usersApi = new UsersApi();

export { usersApi };
