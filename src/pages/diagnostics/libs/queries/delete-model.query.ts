import { diagnosticsApi } from '@/packages/diagnostics';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DiagnosticQueryKey } from '../enums';

const useDeleteModel = (diagnosticId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (modelId: string) => diagnosticsApi.deleteModel(modelId),
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: [...DiagnosticQueryKey.GET_DIAGNOSTIC_MODELS, diagnosticId],
      });
    },
  });
};

export { useDeleteModel };
