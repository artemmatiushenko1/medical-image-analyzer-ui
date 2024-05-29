import { wait } from '@/libs/helpers';
import {
  CreateDiagnosticRequest,
  CreateDiagnosticResponse,
  Diagnostic,
  GetAllDiagnosticsResponse,
} from './types';
import { MOCK_DIAGNOSTICS } from './mocks';

class DiagnosticsApi {
  diagnostics = [...MOCK_DIAGNOSTICS];

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
}

const diagnosticsApi = new DiagnosticsApi();

export { diagnosticsApi };
