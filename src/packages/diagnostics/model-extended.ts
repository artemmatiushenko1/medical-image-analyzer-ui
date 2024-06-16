import { ValueOf } from '@/libs/types';
import { Diagnostic, Model, ModelVersion } from './types';
import { ModelVersionStatus } from './enums';

class ModelExtended implements Model {
  constructor(
    public id: string,
    public name: string,
    public createdAt: string,
    public updatedAt: string,
    public queueName: string,
    public description: string | null,
    public status: ValueOf<{
      readonly ENABLED: 'ENABLED';
      readonly DISABLED: 'DISABLED';
    }>,
    public type: Diagnostic,
    public versions: ModelVersion[],
  ) {}

  get currentVersion(): ModelVersion | null {
    const enabledModels = this.versions.filter(
      (version) => version.status === ModelVersionStatus.ENABLED,
    );

    enabledModels.sort((a, b) => b.version - a.version);

    const currentVersion = enabledModels.shift();

    if (!currentVersion) {
      return null;
    }

    return currentVersion;
  }
}

export { ModelExtended };
