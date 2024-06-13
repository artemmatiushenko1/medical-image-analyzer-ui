import { useQuery } from '@tanstack/react-query';
import { DiagnosticQueryKey } from '../enums';
import { diagnosticsApi } from '@/packages/diagnostics';

const useGetAllDiagnostics = () => {
  return useQuery({
    queryKey: DiagnosticQueryKey.GET_ALL_DIAGNOSTICS,
    queryFn: diagnosticsApi.getAllDiagnostics,
  });
};

export { useGetAllDiagnostics };
