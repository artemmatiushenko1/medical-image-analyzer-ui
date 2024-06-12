import { httpClient } from '@/libs/packages/http';
import { AuthApi } from './auth.api';

const authApi = new AuthApi(httpClient);

export { MOCK_USER } from './mocks';
export { type SignInRequest } from './types';
export { signInSchema } from './validation-schemas';
export { authApi };
