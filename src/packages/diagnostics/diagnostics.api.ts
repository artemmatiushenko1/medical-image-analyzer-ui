import { wait } from '@/libs/helpers';
import { CreateDiagnosticRequest, CreateDiagnosticResponse } from './types';

class DiagnosticsApi {
  createDiagnostic = async (
    request: CreateDiagnosticRequest,
  ): Promise<CreateDiagnosticResponse> =>
    wait(2000).then(() => ({
      id: crypto.randomUUID(),
      previewImg: '',
      name: request.name,
    }));
}

const diagnosticsApi = new DiagnosticsApi();

export { diagnosticsApi };
