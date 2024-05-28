import { Role } from './enums';
import { User } from './types';

const mockUsers: User[] = [
  {
    id: '1',
    firstName: 'Artem',
    lastName: 'Matiushenko',
    email: 'artem.matiushenko@gmail.com',
    role: Role.USER,
  },
  {
    id: '2',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@gmail.com',
    role: Role.USER,
  },
  {
    id: '3',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@gmail.com',
    role: Role.USER,
  },
  {
    id: '4',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@gmail.com',
    role: Role.USER,
  },
  {
    id: '5',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@gmail.com',
    role: Role.USER,
  },
];

export { mockUsers };
