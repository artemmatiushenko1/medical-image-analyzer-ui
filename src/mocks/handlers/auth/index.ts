import { HttpResponse, delay, http } from 'msw';
import { MOCK_USER } from './mocks';

const handlers = [
  http.post('/auth/sign-in', async () => {
    await delay('real');

    return HttpResponse.json({ accessToken: crypto.randomUUID() });
  }),

  http.get('/profile', async () => {
    await delay(1000);

    return HttpResponse.json(MOCK_USER);
  }),
];

export default handlers;
