import { MimeType } from '@/libs/enums';
import { GetProfileResponse, SignInRequest, SignInResponse } from './types';
import { HttpApi, HttpRequestOptionsBuilder } from '@/libs/packages/http';

class AuthApi extends HttpApi {
  signIn = (request: SignInRequest): Promise<SignInResponse> => {
    const options = new HttpRequestOptionsBuilder()
      .post('/auth/sign-in')
      .body(JSON.stringify(request))
      .contentType(MimeType.JSON)
      .build();

    return this.httpClient.request(options);
  };

  getProfile = (): Promise<GetProfileResponse> => {
    const options = new HttpRequestOptionsBuilder()
      .get('/auth/profile')
      .authorized()
      .build();

    return this.httpClient.request(options);
  };

  changePassword = (password: string) => {
    const options = new HttpRequestOptionsBuilder()
      .patch('/auth/password')
      .body(JSON.stringify({ password }))
      .authorized()
      .build();

    return this.httpClient.request(options);
  };
}

export { AuthApi };
