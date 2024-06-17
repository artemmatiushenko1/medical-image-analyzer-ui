import { useQuery } from '@tanstack/react-query';
import { DiagnosticQueryKey } from '../enums';
import { ModelExtended, diagnosticsApi } from '@/packages/diagnostics';

const useGetModel = (modelId: string) => {
  return useQuery({
    queryKey: [...DiagnosticQueryKey.GET_MODEL, modelId],
    queryFn: async () => {
      const response = await diagnosticsApi.getModel(modelId);
      return ModelExtended.fromPlainObject(response);
    },
  });
};

export { useGetModel };
