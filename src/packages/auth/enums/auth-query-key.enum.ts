import { AUTH_QUERY_KEY_PREFIX } from '../constants';

const AuthQueryKey = {
  SIGN_IN: [AUTH_QUERY_KEY_PREFIX, 'signIn'],
} as const;

export { AuthQueryKey };
