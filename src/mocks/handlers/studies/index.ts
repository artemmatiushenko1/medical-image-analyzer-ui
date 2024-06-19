import { HttpResponse, delay, http } from 'msw';
import { MOCK_STUDY_SUMMARIES } from './mocks';

const studySummaries = [...MOCK_STUDY_SUMMARIES];

const handlers = [
  http.post('/diagnostics', async () => {
    await delay('real');

    return HttpResponse.json(studySummaries[0]);
  }),

  http.get('/diagnostics', async () => {
    await delay('real');

    return HttpResponse.json(studySummaries);
  }),

  http.get('/diagnostics/:id', async ({ params }) => {
    await delay('real');

    const study = studySummaries.find((study) => study.id === params.id);

    return HttpResponse.json(study);
  }),
];

export default handlers;
