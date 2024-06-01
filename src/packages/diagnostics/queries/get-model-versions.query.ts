import { useQuery } from 'react-query';
import { DiagnosticQueryKey } from '../enums';
import { diagnosticsApi } from '../diagnostics.api';

const useGetModelVersions = (modelId?: string) => {
  return useQuery(
    [DiagnosticQueryKey.GET_MODEL_VERSIONS, modelId],
    () => (modelId ? diagnosticsApi.getModelVersions(modelId) : undefined),
    { enabled: Boolean(modelId) },
  );
};

export { useGetModelVersions };
