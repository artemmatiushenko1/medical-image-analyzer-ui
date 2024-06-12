import { httpClient } from '@/libs/packages/http';
import { AuthApi } from './auth.api';

const authApi = new AuthApi(httpClient);

export { type SignInRequest } from './types';
export { signInSchema } from './validation-schemas';
export { authApi };
