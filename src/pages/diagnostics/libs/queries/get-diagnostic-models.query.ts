import { useQuery } from '@tanstack/react-query';
import { DiagnosticQueryKey } from '../enums';
import { ModelExtended, diagnosticsApi } from '@/packages/diagnostics';

const useGetDiagnosticModels = (diagnosticId?: string) => {
  return useQuery({
    queryKey: [...DiagnosticQueryKey.GET_DIAGNOSTIC_MODELS, diagnosticId],
    queryFn: async () => {
      if (!diagnosticId) return;

      const response = await diagnosticsApi.getDiagnosticModels(diagnosticId);

      return response.map((model) => ModelExtended.fromPlainObject(model));
    },
    enabled: Boolean(diagnosticId),
  });
};

export { useGetDiagnosticModels };
