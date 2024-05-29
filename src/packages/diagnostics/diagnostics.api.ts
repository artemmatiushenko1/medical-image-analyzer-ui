import { delayResolve } from '@/libs/helpers';
import { CreateDiagnosticRequest, CreateDiagnosticResponse } from './types';

class DiagnosticsApi {
  createDiagnostic = async (
    request: CreateDiagnosticRequest,
  ): Promise<CreateDiagnosticResponse> =>
    delayResolve(2000, {
      id: crypto.randomUUID(),
      previewImg: '',
      name: request.name,
    });
}

const diagnosticsApi = new DiagnosticsApi();

export { diagnosticsApi };
