import { Role, User } from '@/packages/users';
import { HttpResponse, delay, http } from 'msw';
import { MOCK_USERS } from './mocks';

const users = [...MOCK_USERS];

const handlers = [
  http.get('/users/profiles', async () => {
    await delay('real');

    return HttpResponse.json(users);
  }),

  http.post('/auth/patients', async ({ request }) => {
    await delay('real');

    const data = (await request.json()) as User;

    const newUser = {
      ...data,
      id: crypto.randomUUID(),
      role: Role.USER,
    };

    users.push(newUser);

    return HttpResponse.json({
      user: newUser,
      password: crypto.randomUUID().split('-').shift(),
    });
  }),
];

export default handlers;
