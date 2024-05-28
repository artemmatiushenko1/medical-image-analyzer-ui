import { createQueryKey } from '@/libs/packages/react-query';
import { USERS_QUERY_KEY_PREFIX } from '../constants';

const UsersQueryKey = {
  GET_ALL_USERS: createQueryKey(USERS_QUERY_KEY_PREFIX, 'getAllUsers'),
} as const;

export { UsersQueryKey };
