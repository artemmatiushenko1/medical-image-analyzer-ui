import { wait } from '@/libs/helpers';
import { SignInRequest, SignInResponse } from './types';

class AuthApi {
  signIn = (_request: SignInRequest): Promise<SignInResponse> =>
    wait(2000).then(() => ({ accessToken: crypto.randomUUID() }));
}

const authApi = new AuthApi();

export { authApi };
