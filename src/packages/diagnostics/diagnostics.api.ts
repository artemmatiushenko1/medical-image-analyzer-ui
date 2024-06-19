import { MimeType } from '@/libs/enums';
import {
  ChangeModelStatusRequest,
  ChangeModelVersionStatusRequest,
  CreateDiagnosticRequest,
  CreateDiagnosticResponse,
  CreateModelRequest,
  CreateModelResponse,
  CreateModelVersionRequest,
  CreateModelVersionResponse,
  GetAllDiagnosticsResponse,
  GetAvailableModelsResponse,
  GetDiagnosticModelsResponse,
  GetModelResponse,
} from './types';
import { HttpApi, HttpRequestOptionsBuilder } from '@/libs/packages/http';
import { ModelExtended } from './model-extended';

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

  getModel = async (modelId: string): Promise<GetModelResponse> => {
    const options = new HttpRequestOptionsBuilder()
      .get(`/diagnostic-models/${modelId}`)
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

  changeModelStatus = (modelId: string, request: ChangeModelStatusRequest) => {
    const options = new HttpRequestOptionsBuilder()
      .patch(`/diagnostic-models/${modelId}/status`)
      .body(JSON.stringify(request))
      .contentType(MimeType.JSON)
      .authorized()
      .build();

    return this.httpClient.request(options);
  };

  changeModelVersionStatus = (
    versionId: string,
    request: ChangeModelVersionStatusRequest,
  ) => {
    const options = new HttpRequestOptionsBuilder()
      .patch(`/diagnostic-models/versions/${versionId}/status`)
      .body(JSON.stringify(request))
      .contentType(MimeType.JSON)
      .authorized()
      .build();

    return this.httpClient.request(options);
  };

  getAvailableModels = async (): Promise<GetAvailableModelsResponse> => {
    const options = new HttpRequestOptionsBuilder()
      .get('/diagnostic-models/available')
      .authorized()
      .build();

    const response = await this.httpClient.request<GetAvailableModelsResponse>(
      options,
    );

    return response.map((model) => ModelExtended.fromPlainObject(model));
  };

  deleteModel = (modelId: string) => {
    const options = new HttpRequestOptionsBuilder()
      .delete(`/diagnostic-models/${modelId}`)
      .authorized()
      .build();

    return this.httpClient.request(options);
  };

  deleteDiagnostic = (diagnosticId: string) => {
    const options = new HttpRequestOptionsBuilder()
      .delete(`/diagnostic-types/${diagnosticId}`)
      .authorized()
      .build();

    return this.httpClient.request(options);
  };
}

export { DiagnosticsApi };
