import { Role, User } from '@/packages/users';
import { HttpResponse, delay, http } from 'msw';
import { MOCK_USERS } from './mocks';

const users = [...MOCK_USERS];

const handlers = [
  http.get('/users', async () => {
    await delay('real');

    return HttpResponse.json(users);
  }),

  http.post('/users', async ({ request }) => {
    await delay('real');

    const data = (await request.json()) as User;

    const newUser = {
      ...data,
      id: crypto.randomUUID(),
      role: Role.ADMIN,
    };

    users.push(newUser);

    return HttpResponse.json(newUser);
  }),
];

export default handlers;
