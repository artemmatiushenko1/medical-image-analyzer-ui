import { useQuery } from 'react-query';
import { DiagnosticQueryKey } from '../enums';
import { diagnosticsApi } from '../diagnostics.api';

const useGetDiagnosticModels = (diagnosticId?: string) => {
  return useQuery(
    [DiagnosticQueryKey.GET_DIAGNOSTIC_MODELS, diagnosticId],
    () =>
      diagnosticId
        ? diagnosticsApi.getDiagnosticModels(diagnosticId)
        : undefined,
    { enabled: Boolean(diagnosticId) },
  );
};

export { useGetDiagnosticModels };
