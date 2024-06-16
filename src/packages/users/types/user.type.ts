import { ValueOf } from '@/libs/types';
import { Role, SexAtBirth } from '../enums';

type User = {
  id: string;
  email: string;
  name: string;
  role: ValueOf<typeof Role>;
  age: number | null;
  createdAt: string;
  sexAtBirth: ValueOf<typeof SexAtBirth> | null;
  updatedAt: string;
};

export { type User };
