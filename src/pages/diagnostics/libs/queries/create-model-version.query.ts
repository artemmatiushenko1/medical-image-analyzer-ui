import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DiagnosticQueryKey } from '../enums';
import {
  CreateModelVersionRequest,
  diagnosticsApi,
} from '@/packages/diagnostics';

const useCreateModelVersion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      modelId,
      request,
    }: {
      modelId: string;
      request: CreateModelVersionRequest;
    }) => diagnosticsApi.createModelVersion(modelId, request),
    onSuccess: (_, { modelId }) =>
      queryClient.invalidateQueries({
        queryKey: [...DiagnosticQueryKey.GET_MODEL_VERSIONS, modelId],
        refetchType: 'all',
      }),
  });
};

export { useCreateModelVersion };
