import { HttpResponse, delay, http } from 'msw';
import { MOCK_STUDY_SUMMARIES } from './mocks';
import { StudyStatus, StudySummary } from '@/packages/studies';
import dayjs from 'dayjs';
import { readFileAsBase64 } from '@/libs/helpers';

const studySummaries = [...MOCK_STUDY_SUMMARIES];

const handlers = [
  http.post('/diagnostics', async ({ request }) => {
    await delay('real');

    const data = await request.formData();

    const image = await readFileAsBase64(data.get('file') as File);

    const newStudySummary = {
      name: data.get('name'),
      description: data.get('description'),
      id: crypto.randomUUID(),
      createdAt: dayjs().format(),
      updatedAt: dayjs().format(),
      status: StudyStatus.PENDING,
      image: { src: image },
    } as StudySummary;

    studySummaries.unshift(newStudySummary);

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
