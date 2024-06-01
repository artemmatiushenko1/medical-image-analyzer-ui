import { wait } from '@/libs/helpers';
import {
  CreateDiagnosticRequest,
  CreateDiagnosticResponse,
  CreateModelRequest,
  CreateModelResponse,
  Diagnostic,
  GetAllDiagnosticsResponse,
  GetDiagnosticModelsResponse,
  GetModelVersionsResponse,
  Model,
} from './types';
import { MOCK_DIAGNOSTICS, MOCK_MODELS, MOCK_MODEL_VERSIONS } from './mocks';
import dayjs from 'dayjs';

class DiagnosticsApi {
  diagnostics = [...MOCK_DIAGNOSTICS];
  models = [...MOCK_MODELS];
  modelVersions = [...MOCK_MODEL_VERSIONS];

  getAllDiagnostics = (): Promise<GetAllDiagnosticsResponse> =>
    wait(2000).then(() => this.diagnostics);

  createDiagnostic = (
    request: CreateDiagnosticRequest,
  ): Promise<CreateDiagnosticResponse> =>
    wait(2000).then(() => {
      const newDiagnostic: Diagnostic = {
        id: crypto.randomUUID(),
        previewImg: '',
        name: request.name,
      };

      this.diagnostics = [...this.diagnostics, newDiagnostic];

      return newDiagnostic;
    });

  getDiagnosticModels = (
    _diagnosticId: string,
  ): Promise<GetDiagnosticModelsResponse> => wait(2000).then(() => this.models);

  createModel = (
    _diagnosticId: string,
    request: CreateModelRequest,
  ): Promise<CreateModelResponse> =>
    wait(2000).then(() => {
      const newModel: Model = {
        id: crypto.randomUUID(),
        name: request.name,
        enabled: true,
        currentVersion: {
          id: crypto.randomUUID(),
          name: 'Increased accuracy',
          notes: '',
          createdAt: dayjs().toISOString(),
          revision: 1,
        },
      };

      this.models = [...this.models, newModel];

      return newModel;
    });

  getModelVersions = (_modelId: string): Promise<GetModelVersionsResponse> => {
    return wait(2000).then(() => this.modelVersions);
  };

  // restoreModelVersion = (_modelId: string) => {};
}

const diagnosticsApi = new DiagnosticsApi();

export { diagnosticsApi };
