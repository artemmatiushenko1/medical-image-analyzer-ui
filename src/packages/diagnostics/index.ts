import { httpClient } from '@/libs/packages/http';
import { DiagnosticsApi } from './diagnostics.api';

const diagnosticsApi = new DiagnosticsApi(httpClient);

export {
  type Diagnostic,
  type CreateDiagnosticRequest,
  type Model,
  type CreateModelRequest,
  type ModelVersion,
  type CreateModelVersionRequest,
} from './types';
export {
  createModelSchema,
  createModelVersionSchema,
} from './validation-schemas';
export { diagnosticsApi };
