import { AUTH_QUERY_KEY_PREFIX } from '../constants';

const AuthQueryKey = {
  SIGN_IN: [AUTH_QUERY_KEY_PREFIX, 'signIn'],
  GET_PROFILE: [AUTH_QUERY_KEY_PREFIX, 'getProfile'],
} as const;

export { AuthQueryKey };
