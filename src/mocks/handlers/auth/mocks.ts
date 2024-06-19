import { Role, User } from '@/packages/users';
import dayjs from 'dayjs';

const MOCK_USER: User = {
  id: '1',
  email: 'artom.matyushenko@gmail.com',
  name: 'Artem Matiushenko',
  role: Role.ADMIN,
  createdAt: dayjs().format(),
  updatedAt: dayjs().format(),
  sexAtBirth: null,
  age: null,
};

export { MOCK_USER };
