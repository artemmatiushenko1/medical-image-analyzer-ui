import { ModelVersion } from './model-version.type';

type Model = {
  id: string;
  enabled: boolean;
  name: string;
  currentVersion: ModelVersion;
};

export { type Model };
