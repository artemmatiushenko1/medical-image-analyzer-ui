import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateModelRequest } from '../types';
import { diagnosticsApi } from '../diagnostics.api';
import { DiagnosticQueryKey } from '../enums';

const useCreateModel = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      diagnosticId,
      request,
    }: {
      diagnosticId: string;
      request: CreateModelRequest;
    }) => diagnosticsApi.createModel(diagnosticId, request),
    onSuccess: (_, { diagnosticId }) =>
      queryClient.invalidateQueries({
        refetchType: 'all',
        queryKey: [...DiagnosticQueryKey.GET_DIAGNOSTIC_MODELS, diagnosticId],
      }),
  });
};

export { useCreateModel };
