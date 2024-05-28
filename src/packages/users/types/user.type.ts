import { ValueOf } from '@/libs/types';
import { Role } from '../enums';

type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: ValueOf<typeof Role>;
};

export { type User };
