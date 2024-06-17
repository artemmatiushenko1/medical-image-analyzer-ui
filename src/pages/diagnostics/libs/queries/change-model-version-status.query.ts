import {
  ChangeModelVersionStatusRequest,
  diagnosticsApi,
} from '@/packages/diagnostics';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DiagnosticQueryKey } from '../enums';

const useChangeModelVersionStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (
      request: ChangeModelVersionStatusRequest & {
        versionId: string;
        modelId: string;
      },
    ) => {
      const { versionId, status } = request;
      return diagnosticsApi.changeModelVersionStatus(versionId, { status });
    },
    onSettled: (_data, _error, { modelId }) =>
      Promise.all([
        queryClient.invalidateQueries({
          queryKey: DiagnosticQueryKey.GET_DIAGNOSTIC_MODELS,
          refetchType: 'all',
        }),
        queryClient.invalidateQueries({
          queryKey: [...DiagnosticQueryKey.GET_MODEL, modelId],
          refetchType: 'all',
        }),
      ]),
  });
};

export { useChangeModelVersionStatus };
