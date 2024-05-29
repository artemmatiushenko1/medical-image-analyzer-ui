import { Role } from '@/packages/users';
import { wait } from '@/libs/helpers';
import { AddUserRequest, AddUserResponse, GetAllUsersResponse } from './types';
import { mockUsers } from './mocks';

class UsersApi {
  users = [...mockUsers];

  addUser = async (request: AddUserRequest): Promise<AddUserResponse> => {
    const user = await wait(2000).then(() => ({
      ...request,
      id: crypto.randomUUID(),
      role: Role.ADMIN,
    }));
    this.users = [...this.users, user];
    return user;
  };

  getAllUsers = (): Promise<GetAllUsersResponse> =>
    wait(2000).then(() => this.users);
}

const usersApi = new UsersApi();

export { usersApi };
