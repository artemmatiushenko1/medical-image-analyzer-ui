import { GetProfileResponse, SignInRequest, SignInResponse } from './types';
import { HttpApi, HttpRequestOptionsBuilder } from '@/libs/packages/http';

class AuthApi extends HttpApi {
  signIn = (request: SignInRequest): Promise<SignInResponse> => {
    const options = new HttpRequestOptionsBuilder()
      .post()
      .url('/auth/sign-in')
      .body(JSON.stringify(request))
      .build();

    return this.httpClient.request(options);
  };

  getProfile = (): Promise<GetProfileResponse> => {
    const options = new HttpRequestOptionsBuilder()
      .get()
      .url('/profile')
      .authorized()
      .build();

    return this.httpClient.request(options);
  };
}

export { AuthApi };
