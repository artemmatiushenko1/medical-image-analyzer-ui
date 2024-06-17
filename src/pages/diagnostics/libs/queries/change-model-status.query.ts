import {
  ChangeModelStatusRequest,
  diagnosticsApi,
} from '@/packages/diagnostics';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DiagnosticQueryKey } from '../enums';

const useChangeModelStatus = (modelId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [...DiagnosticQueryKey.CHANGE_MODEL_STATUS, modelId],
    mutationFn: (request: ChangeModelStatusRequest) => {
      return diagnosticsApi.changeModelStatus(modelId, request);
    },
    onSettled: () =>
      queryClient.invalidateQueries({
        queryKey: DiagnosticQueryKey.GET_DIAGNOSTIC_MODELS,
      }),
  });
};

export { useChangeModelStatus };
