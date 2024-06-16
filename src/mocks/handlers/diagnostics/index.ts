import { HttpResponse, delay, http } from 'msw';
import { MOCK_DIAGNOSTICS, MOCK_MODELS, MOCK_MODEL_VERSIONS } from './mocks';
import {
  CreateDiagnosticRequest,
  CreateModelVersionRequest,
  Diagnostic,
  ModelStatus,
  ModelVersion,
} from '@/packages/diagnostics';
import { CreateModelRequest, Model } from '@/packages/diagnostics';
import dayjs from 'dayjs';

const diagnostics = [...MOCK_DIAGNOSTICS];
const models = [...MOCK_MODELS];
const modelVersions = [...MOCK_MODEL_VERSIONS];

const handlers = [
  http.get('/diagnostics', async () => {
    await delay('real');

    return HttpResponse.json(diagnostics);
  }),

  http.get('/diagnostics/:id/models', async () => {
    await delay('real');

    return HttpResponse.json(models);
  }),

  http.get('/models/:id/versions', async () => {
    await delay('real');

    return HttpResponse.json(modelVersions);
  }),

  http.post('/diagnostics', async ({ request }) => {
    await delay('real');

    const data = (await request.json()) as CreateDiagnosticRequest;

    const newDiagnostic: Diagnostic = {
      id: crypto.randomUUID(),
      previewImg: '',
      ...data,
      createdAt: dayjs().format(),
      updatedAt: dayjs().format(),
      description: null,
    };

    diagnostics.push(newDiagnostic);

    return HttpResponse.json(newDiagnostic);
  }),

  http.post('/diagnostics/:id/models', async ({ request }) => {
    await delay('real');

    const data = (await request.json()) as CreateModelRequest;

    const newModel: Model = {
      id: crypto.randomUUID(),
      enabled: true,
      currentVersion: modelVersions[0],
      typeId: crypto.randomUUID(),
      description: null,
      createdAt: dayjs().format(),
      updatedAt: dayjs().format(),
      status: ModelStatus.ENABLED,
      queueName: crypto.randomUUID(),
      ...data,
    };

    models.push(newModel);

    return HttpResponse.json(newModel);
  }),

  http.post('/models/:id/versions', async ({ request }) => {
    await delay('real');

    const data = (await request.json()) as CreateModelVersionRequest;

    const newVersion: ModelVersion = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: dayjs().toISOString(),
      revision: 5,
    };

    modelVersions.unshift(newVersion);

    return HttpResponse.json(newVersion);
  }),
];

export default handlers;
