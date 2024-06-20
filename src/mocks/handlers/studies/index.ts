import { HttpResponse, delay, http } from 'msw';
import { MOCK_STUDY_SUMMARIES } from './mocks';
import { Study, StudyStatus } from '@/packages/studies';
import dayjs from 'dayjs';
import { readFileAsBase64 } from '@/libs/helpers';
import { models } from '../diagnostics';
import { Model } from '@/packages/diagnostics';

const studySummaries = [...MOCK_STUDY_SUMMARIES];

const handlers = [
  http.post('/diagnostics', async ({ request }) => {
    await delay('real');

    const data = await request.formData();

    const image = (await readFileAsBase64(data.get('file') as File)) as string;

    const [modelId] = (data.get('modelIds') ?? []) as string[];

    const model = models.find((model) => model.id === modelId) as Model;

    const newStudySummary: Study = {
      name: data.get('name')?.toString() ?? '',
      description: data.get('description')?.toString() ?? '',
      id: crypto.randomUUID(),
      createdAt: dayjs().format(),
      updatedAt: dayjs().format(),
      status: StudyStatus.PENDING,
      image: { src: image ?? '' },
      model: model,
      type: model?.type,
    };

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
