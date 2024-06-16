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

    return response.filter((item) => item.typeId === diagnosticId);
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

  createModel = (
    diagnosticId: string,
    request: CreateModelRequest,
  ): Promise<CreateModelResponse> => {
    const options = new HttpRequestOptionsBuilder()
      .post(`/diagnostics/${diagnosticId}/models`)
      .body(JSON.stringify(request))
      .authorized()
      .build();

    return this.httpClient.request(options);
  };

  createModelVersion = (
    modelId: string,
    request: CreateModelVersionRequest,
  ): Promise<CreateModelVersionResponse> => {
    const options = new HttpRequestOptionsBuilder()
      .post(`/models/${modelId}/versions`)
      .body(JSON.stringify(request))
      .authorized()
      .build();

    return this.httpClient.request(options);
  };
}

export { DiagnosticsApi };
