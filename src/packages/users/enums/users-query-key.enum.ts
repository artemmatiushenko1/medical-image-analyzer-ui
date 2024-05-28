import { USERS_QUERY_KEY_PREFIX } from '../constants';

const UsersQueryKey = {
  GET_ALL_USERS: [USERS_QUERY_KEY_PREFIX, 'getAllUsers'],
} as const;

export { UsersQueryKey };
