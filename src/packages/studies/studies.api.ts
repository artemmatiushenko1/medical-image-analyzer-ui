import { HttpApi, HttpRequestOptionsBuilder } from '@/libs/packages/http';
import { Study } from './types';

class StudiesApi extends HttpApi {
  getAllStudies = (): Promise<Study[]> => {
    const options = new HttpRequestOptionsBuilder()
      .get('/studies')
      .authorized()
      .build();

    return this.httpClient.request(options);
  };

  getStudy = (id: string) => {
    const options = new HttpRequestOptionsBuilder()
      .get(`/studies/${id}`)
      .authorized()
      .build();

    return this.httpClient.request(options);
  };

  createStudy = () => {
    const options = new HttpRequestOptionsBuilder()
      .post('/studies')
      .body(JSON.stringify({})) // TODO: Add type
      .authorized()
      .build();

    return this.httpClient.request(options);
  };
}

export { StudiesApi };
