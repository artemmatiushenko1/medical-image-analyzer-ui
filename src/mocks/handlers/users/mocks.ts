import { Role, User } from '@/packages/users';
import dayjs from 'dayjs';

const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'Artem Matiushenko',
    email: 'artem.matiushenko@gmail.com',
    role: Role.USER,
    createdAt: dayjs().format(),
    updatedAt: dayjs().format(),
    sexAtBirth: null,
    age: null,
  },
  {
    id: '2',
    name: 'John Doe',
    email: 'john.doe@gmail.com',
    role: Role.USER,
    createdAt: dayjs().format(),
    updatedAt: dayjs().format(),
    sexAtBirth: null,
    age: null,
  },
  {
    id: '3',
    name: 'John Doe',
    email: 'john.doe@gmail.com',
    role: Role.USER,
    createdAt: dayjs().format(),
    updatedAt: dayjs().format(),
    sexAtBirth: null,
    age: null,
  },
  {
    id: '4',
    name: 'John Doe',
    email: 'john.doe@gmail.com',
    role: Role.USER,
    createdAt: dayjs().format(),
    updatedAt: dayjs().format(),
    sexAtBirth: null,
    age: null,
  },
  {
    id: '5',
    name: 'John Doe',
    email: 'john.doe@gmail.com',
    role: Role.USER,
    createdAt: dayjs().format(),
    updatedAt: dayjs().format(),
    sexAtBirth: null,
    age: null,
  },
];

export { MOCK_USERS };
