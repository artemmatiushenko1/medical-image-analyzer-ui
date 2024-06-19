import { HttpApi, HttpRequestOptionsBuilder } from '@/libs/packages/http';
import { CreateStudyRequest, Study, StudySummary } from './types';

class StudiesApi extends HttpApi {
  getAllStudies = (): Promise<StudySummary[]> => {
    const options = new HttpRequestOptionsBuilder()
      .get('/diagnostics')
      .authorized()
      .build();

    return this.httpClient.request(options);
  };

  createStudy = (request: CreateStudyRequest) => {
    const form = new FormData();

    form.append('file', request.file);
    form.append('name', request.name);
    form.append('modelIds', request.modelIds.join(','));

    if (request.description) {
      form.append('description', request.description);
    }
    const options = new HttpRequestOptionsBuilder()
      .post('/diagnostics')
      .body(form)
      .authorized()
      .build();

    return this.httpClient.request(options);
  };

  getStudy = (id: string): Promise<Study> => {
    const options = new HttpRequestOptionsBuilder()
      .get(`/diagnostics/${id}`)
      .authorized()
      .build();

    return this.httpClient.request(options);
  };
}

export { StudiesApi };
