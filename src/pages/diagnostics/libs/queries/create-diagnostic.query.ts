import {
  CreateDiagnosticRequest,
  diagnosticsApi,
} from '@/packages/diagnostics';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DiagnosticQueryKey } from '../enums';

const useCreateDiagnostic = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: CreateDiagnosticRequest) =>
      diagnosticsApi.createDiagnostic(request),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: DiagnosticQueryKey.GET_ALL_DIAGNOSTICS,
      }),
  });
};

export { useCreateDiagnostic };
