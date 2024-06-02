import { wait } from '@/libs/helpers';
import { GetProfileResponse, SignInRequest, SignInResponse } from './types';
import { MOCK_USER } from './mocks';

class AuthApi {
  signIn = (_request: SignInRequest): Promise<SignInResponse> =>
    wait(2000).then(() => ({ accessToken: crypto.randomUUID() }));

  getProfile = (): Promise<GetProfileResponse> =>
    wait(2000).then(() => MOCK_USER);
}

const authApi = new AuthApi();

export { authApi };
