import { useQuery } from '@tanstack/react-query';
import { DiagnosticQueryKey } from '../enums';
import { diagnosticsApi } from '@/packages/diagnostics';

// TODO: remove, unusued
const useGetModel = (modelId?: string) => {
  return useQuery({
    queryKey: [...DiagnosticQueryKey.GET_MODEL, modelId],
    queryFn: () => (modelId ? diagnosticsApi.getModel(modelId) : undefined),
    enabled: Boolean(modelId),
  });
};

export { useGetModel };
