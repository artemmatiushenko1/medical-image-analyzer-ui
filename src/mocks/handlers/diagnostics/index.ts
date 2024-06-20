import { HttpResponse, delay, http } from 'msw';
import { MOCK_DIAGNOSTICS, MOCK_MODELS, MOCK_MODEL_VERSIONS } from './mocks';
import {
  ChangeModelStatusRequest,
  ChangeModelVersionStatusRequest,
  CreateDiagnosticRequest,
  Diagnostic,
  ModelExtended,
  ModelStatus,
  ModelVersion,
  ModelVersionStatus,
} from '@/packages/diagnostics';
import { CreateModelRequest, Model } from '@/packages/diagnostics';
import dayjs from 'dayjs';

let diagnostics = [...MOCK_DIAGNOSTICS];
export let models = [...MOCK_MODELS];
let modelVersions = [...MOCK_MODEL_VERSIONS];

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

  http.delete('/diagnostic-types/:id', async ({ params }) => {
    await delay('real');

    diagnostics = diagnostics.filter((item) => item.id !== params.id);

    return HttpResponse.json({});
  }),

  http.get('/diagnostic-models/:id', async ({ params }) => {
    await delay('real');

    const model = models.find((m) => m.id === params.id);

    return HttpResponse.json(model);
  }),

  http.delete('/diagnostic-models/:id', async ({ params }) => {
    await delay('real');

    models = models.filter((model) => model.id !== params.id);

    return HttpResponse.json({});
  }),

  http.patch('/diagnostic-models/:id/status', async ({ request, params }) => {
    await delay('real');

    const data = (await request.json()) as ChangeModelStatusRequest;

    models = models.map((model) =>
      model.id === params.id ? { ...model, status: data.status } : model,
    );

    return HttpResponse.json({});
  }),

  http.post('/diagnostic-models', async ({ request }) => {
    await delay('real');

    const data = (await request.json()) as CreateModelRequest;

    const version = {
      version: 1,
      name: 'Initial release',
      createdAt: dayjs().format(),
      updatedAt: dayjs().format(),
      status: ModelVersionStatus.ENABLED,
      id: crypto.randomUUID(),
    };

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
      versions: [version],
      currentVersion: version,
    };

    models.unshift(newModel);

    return HttpResponse.json(newModel);
  }),

  http.post('/diagnostic-models/:id/versions', async ({ request, params }) => {
    await delay('real');

    const data = await request.formData();

    const newVersion: ModelVersion = {
      name: data.get('name') as string,
      description: data.get('description') as string,
      id: crypto.randomUUID(),
      createdAt: dayjs().toISOString(),
      version: 5,
      status: ModelVersionStatus.ENABLED,
      updatedAt: dayjs().toISOString(),
    };

    models = models.map((model) => {
      if (model.id === params.id) {
        const lastVersion = model.versions[0];
        lastVersion.status = ModelVersionStatus.DISABLED;
        model.versions = [newVersion, ...modelVersions];
        return model;
      }

      return model;
    });

    return HttpResponse.json(models);
  }),

  http.patch(
    '/diagnostic-models/versions/:id/status',
    async ({ request, params }) => {
      await delay('real');

      const data = (await request.json()) as ChangeModelVersionStatusRequest;

      console.log({ data, params });

      let prevVersion: number;

      modelVersions = modelVersions.map((version) => {
        if (version.id === params.id) {
          prevVersion = version.version;
          return { ...version, status: data.status };
        }

        return version;
      });

      modelVersions = modelVersions.map((version) => {
        if (version.version === prevVersion - 1) {
          return { ...version, status: ModelVersionStatus.ENABLED };
        }

        return version;
      });

      models = models.map((model) =>
        ModelExtended.fromPlainObject({ ...model, versions: modelVersions }),
      );

      return HttpResponse.json({});
    },
  ),
];

export default handlers;
