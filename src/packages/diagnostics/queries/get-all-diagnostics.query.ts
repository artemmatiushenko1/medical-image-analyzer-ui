import { useQuery } from 'react-query';
import { DiagnosticQueryKey } from '../enums';
import { diagnosticsApi } from '../diagnostics.api';

const useGetAllDiagnostics = () => {
  return useQuery(
    DiagnosticQueryKey.GET_ALL_DIAGNOSTICS,
    diagnosticsApi.getAllDiagnostics,
  );
};

export { useGetAllDiagnostics };
