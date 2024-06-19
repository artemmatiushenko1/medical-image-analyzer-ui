import { HttpResponse, delay, http } from 'msw';
import { MOCK_DIAGNOSTICS, MOCK_MODELS, MOCK_MODEL_VERSIONS } from './mocks';
import {
  CreateDiagnosticRequest,
  Diagnostic,
  ModelStatus,
  ModelVersion,
  ModelVersionStatus,
} from '@/packages/diagnostics';
import { CreateModelRequest, Model } from '@/packages/diagnostics';
import dayjs from 'dayjs';

const diagnostics = [...MOCK_DIAGNOSTICS];
const models = [...MOCK_MODELS];
const modelVersions = [...MOCK_MODEL_VERSIONS];

const handlers = [
  http.get('/diagnostic-types', async () => {
    await delay('real');

    return HttpResponse.json(diagnostics);
  }),

  http.get('/diagnostic-models', async () => {
    await delay('real');

    return HttpResponse.json(models);
  }),

  http.get('/diagnostic-models/available', async () => {
    await delay('real');

    return HttpResponse.json(models);
  }),

  http.get('/models/:id/versions', async () => {
    await delay('real');

    return HttpResponse.json(modelVersions);
  }),

  http.post('/diagnostic-types', async ({ request }) => {
    await delay('real');

    const data = (await request.json()) as CreateDiagnosticRequest;

    const newDiagnostic: Diagnostic = {
      id: crypto.randomUUID(),
      ...data,
      createdAt: dayjs().format(),
      updatedAt: dayjs().format(),
    };

    diagnostics.push(newDiagnostic);

    return HttpResponse.json(newDiagnostic);
  }),

  http.get('/diagnostic-models/:id', async () => {
    await delay('real');

    return HttpResponse.json(MOCK_MODELS[0]);
  }),

  http.post('/diagnostic-models', async ({ request }) => {
    await delay('real');

    const data = (await request.json()) as CreateModelRequest;

    const newModel: Model = {
      ...data,
      id: crypto.randomUUID(),
      type: {
        id: data.type.id,
        name: '',
        description: '',
        createdAt: dayjs().format(),
        updatedAt: dayjs().format(),
      },
      createdAt: dayjs().format(),
      updatedAt: dayjs().format(),
      status: ModelStatus.ENABLED,
      versions: MOCK_MODEL_VERSIONS,
      currentVersion: MOCK_MODEL_VERSIONS[0],
    };

    models.push(newModel);

    return HttpResponse.json(newModel);
  }),

  http.post('/diagnostic-models/:id/versions', async ({ request }) => {
    await delay('real');

    const data = await request.formData();

    const newVersion = {
      name: data.get('name'),
      description: data.get('description'),
      id: crypto.randomUUID(),
      createdAt: dayjs().toISOString(),
      version: 5,
      status: ModelVersionStatus.ENABLED,
      updatedAt: dayjs().toISOString(),
    } as ModelVersion;

    modelVersions.unshift(newVersion);

    return HttpResponse.json(newVersion);
  }),
];

export default handlers;
