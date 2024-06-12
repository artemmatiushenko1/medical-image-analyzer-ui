import { Role } from '@/packages/users';
import { delay, http, HttpResponse } from 'msw';

const handlers = [
  http.post('/auth/sign-in', async () => {
    await delay('real');

    return HttpResponse.json({ accessToken: crypto.randomUUID() });
  }),

  http.get('/profile', async () => {
    await delay('real');

    return HttpResponse.json({
      id: '1',
      email: 'artom.matyushenko@gmail.com',
      firstName: 'Artem',
      lastName: 'Matiushenko',
      role: Role.USER,
    });
  }),
];

export default handlers;
