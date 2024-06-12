import { HttpResponse, delay, http } from 'msw';
import { MOCK_STUDIES } from './mocks';

const studies = [...MOCK_STUDIES];

const handlers = [
  http.post('/studies', async () => {
    await delay('real');

    return HttpResponse.json(studies[0]);
  }),

  http.get('/studies', async () => {
    await delay('real');

    return HttpResponse.json(studies);
  }),
];

export default handlers;
