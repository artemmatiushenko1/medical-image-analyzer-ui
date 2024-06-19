import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DiagnosticQueryKey } from '../enums';
import { diagnosticsApi } from '@/packages/diagnostics';

const useDeleteDiagnostic = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (diagnosticId: string) =>
      diagnosticsApi.deleteDiagnostic(diagnosticId),
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: DiagnosticQueryKey.GET_ALL_DIAGNOSTICS,
      });
    },
  });
};

export { useDeleteDiagnostic };
