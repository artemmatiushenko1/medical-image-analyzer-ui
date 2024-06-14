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

  http.get('/studies/:id', async ({ params }) => {
    await delay('real');

    const study = studies.find((study) => study.id === params.id);

    console.log({ params, study });

    return HttpResponse.json(study);
  }),
];

export default handlers;
