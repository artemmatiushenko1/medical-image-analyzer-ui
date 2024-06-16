import { ValueOf } from '@/libs/types';
import { Environment } from './enums';

class Config {
  private getEnvVariable = <T>(name: string): T => {
    const value = import.meta.env[`VITE_${name}`] as T;

    if (!value) {
      throw Error(`Enviromental variable {{${name}}} is missing!`);
    }

    return value;
  };

  get ENV(): ValueOf<typeof Environment> {
    return this.getEnvVariable('ENV');
  }

  get BASE_API_URL() {
    return this.getEnvVariable<string>('BASE_API_URL');
  }

  get ENABLE_MOCK_API(): boolean {
    const value = this.getEnvVariable('ENABLE_MOCK_API');
    return value === 'true';
  }
}

export { Config };
