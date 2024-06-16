import { MimeType } from '@/libs/enums';
import { AddUserRequest, AddUserResponse, GetAllUsersResponse } from './types';
import { HttpApi, HttpRequestOptionsBuilder } from '@/libs/packages/http';

class UsersApi extends HttpApi {
  addUser = async (request: AddUserRequest): Promise<AddUserResponse> => {
    const options = new HttpRequestOptionsBuilder()
      .post('/auth/patients')
      .body(JSON.stringify(request))
      .contentType(MimeType.JSON)
      .authorized()
      .build();

    return this.httpClient.request(options);
  };

  getAllUsers = (): Promise<GetAllUsersResponse> => {
    const options = new HttpRequestOptionsBuilder()
      .get('/users/profiles')
      .authorized()
      .build();

    return this.httpClient.request(options);
  };
}

export { UsersApi };
