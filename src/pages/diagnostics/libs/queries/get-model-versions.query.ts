import { useQuery } from '@tanstack/react-query';
import { DiagnosticQueryKey } from '../enums';
import { diagnosticsApi } from '@/packages/diagnostics';

const useGetModelVersions = (modelId?: string) => {
  return useQuery({
    queryKey: [...DiagnosticQueryKey.GET_MODEL_VERSIONS, modelId],
    queryFn: () =>
      modelId ? diagnosticsApi.getModelVersions(modelId) : undefined,
    enabled: Boolean(modelId),
  });
};

export { useGetModelVersions };
