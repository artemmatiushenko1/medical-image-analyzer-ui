import { AddUserRequest, AddUserResponse, GetAllUsersResponse } from './types';
import { HttpApi, HttpRequestOptionsBuilder } from '@/libs/packages/http';

class UsersApi extends HttpApi {
  addUser = async (request: AddUserRequest): Promise<AddUserResponse> => {
    const options = new HttpRequestOptionsBuilder()
      .post('/users')
      .body(JSON.stringify(request))
      .authorized()
      .build();

    return this.httpClient.request(options);
  };

  getAllUsers = (): Promise<GetAllUsersResponse> => {
    const options = new HttpRequestOptionsBuilder()
      .get('/users')
      .authorized()
      .build();

    return this.httpClient.request(options);
  };
}

export { UsersApi };
