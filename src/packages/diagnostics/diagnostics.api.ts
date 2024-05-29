import { wait } from '@/libs/helpers';
import {
  CreateDiagnosticRequest,
  CreateDiagnosticResponse,
  Diagnostic,
  GetAllDiagnosticsResponse,
  GetDiagnosticModelsResponse,
} from './types';
import { MOCK_DIAGNOSTICS, MOCK_MODELS } from './mocks';

class DiagnosticsApi {
  diagnostics = [...MOCK_DIAGNOSTICS];
  models = [...MOCK_MODELS];

  getAllDiagnostics = (): Promise<GetAllDiagnosticsResponse> =>
    wait(2000).then(() => this.diagnostics);

  createDiagnostic = async (
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

  getDiagnosticModels = async (
    diagnosticId: string,
  ): Promise<GetDiagnosticModelsResponse> => wait(2000).then(() => this.models);
}

const diagnosticsApi = new DiagnosticsApi();

export { diagnosticsApi };
