import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateModelVersionRequest } from '../types';
import { diagnosticsApi } from '../diagnostics.api';
import { DiagnosticQueryKey } from '../enums';

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
