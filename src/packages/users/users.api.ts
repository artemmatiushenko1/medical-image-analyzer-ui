import { delayResolve } from '@/libs/helpers';
import { AddUserRequest } from './types';

class UsersApi {
  addUser = (request: AddUserRequest) => delayResolve(2000, request);
}

export { UsersApi };
