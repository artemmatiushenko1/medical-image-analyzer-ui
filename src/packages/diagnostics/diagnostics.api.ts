import { MimeType } from '@/libs/enums';
import {
  CreateDiagnosticRequest,
  CreateDiagnosticResponse,
  CreateModelRequest,
  CreateModelResponse,
  CreateModelVersionRequest,
  CreateModelVersionResponse,
  GetAllDiagnosticsResponse,
  GetDiagnosticModelsResponse,
  GetModelVersionsResponse,
} from './types';
import { HttpApi, HttpRequestOptionsBuilder } from '@/libs/packages/http';

class DiagnosticsApi extends HttpApi {
  getAllDiagnostics = (): Promise<GetAllDiagnosticsResponse> => {
    const options = new HttpRequestOptionsBuilder()
      .get('/diagnostic-types')
      .authorized()
      .build();

    return this.httpClient.request(options);
  };

  getDiagnosticModels = async (
    diagnosticId: string,
  ): Promise<GetDiagnosticModelsResponse> => {
    const options = new HttpRequestOptionsBuilder()
      .get('/diagnostic-models')
      .authorized()
      .build();

    const response = await this.httpClient.request<GetDiagnosticModelsResponse>(
      options,
    );

    return response.filter((item) => item.type.id === diagnosticId);
  };

  getModelVersions = (modelId: string): Promise<GetModelVersionsResponse> => {
    const options = new HttpRequestOptionsBuilder()
      .get(`/models/${modelId}/versions`)
      .authorized()
      .build();

    return this.httpClient.request(options);
  };

  createDiagnostic = (
    request: CreateDiagnosticRequest,
  ): Promise<CreateDiagnosticResponse> => {
    const options = new HttpRequestOptionsBuilder()
      .post(`/diagnostic-types`)
      .body(JSON.stringify(request))
      .contentType(MimeType.JSON)
      .authorized()
      .build();

    return this.httpClient.request(options);
  };

  createModel = (request: CreateModelRequest): Promise<CreateModelResponse> => {
    const options = new HttpRequestOptionsBuilder()
      .post('/diagnostic-models')
      .body(JSON.stringify(request))
      .contentType(MimeType.JSON)
      .authorized()
      .build();

    return this.httpClient.request(options);
  };

  createModelVersion = (
    modelId: string,
    request: CreateModelVersionRequest,
  ): Promise<CreateModelVersionResponse> => {
    const form = new FormData();

    form.append('file', request.file);
    form.append('name', request.name);

    if (request.description) {
      form.append('description', request.description);
    }

    const options = new HttpRequestOptionsBuilder()
      .post(`/diagnostic-models/${modelId}/versions`)
      .body(form)
      .authorized()
      .build();

    return this.httpClient.request(options);
  };
}

export { DiagnosticsApi };
