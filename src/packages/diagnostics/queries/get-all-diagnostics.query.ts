import { useQuery } from '@tanstack/react-query';
import { DiagnosticQueryKey } from '../enums';
import { diagnosticsApi } from '../diagnostics.api';

const useGetAllDiagnostics = () => {
  return useQuery({
    queryKey: DiagnosticQueryKey.GET_ALL_DIAGNOSTICS,
    queryFn: diagnosticsApi.getAllDiagnostics,
  });
};

export { useGetAllDiagnostics };
