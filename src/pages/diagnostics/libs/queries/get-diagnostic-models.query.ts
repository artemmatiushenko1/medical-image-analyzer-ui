import { useQuery } from '@tanstack/react-query';
import { DiagnosticQueryKey } from '../enums';
import { diagnosticsApi } from '@/packages/diagnostics';

const useGetDiagnosticModels = (diagnosticId?: string) => {
  return useQuery({
    queryKey: [...DiagnosticQueryKey.GET_DIAGNOSTIC_MODELS, diagnosticId],
    queryFn: () =>
      diagnosticId
        ? diagnosticsApi.getDiagnosticModels(diagnosticId)
        : undefined,
    enabled: Boolean(diagnosticId),
  });
};

export { useGetDiagnosticModels };
