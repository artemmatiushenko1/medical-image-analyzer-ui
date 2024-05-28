import { useMutation } from 'react-query';
import { CreateDiagnosticRequest } from '../types';
import { diagnosticsApi } from '../diagnostics.api';

const useCreateDiagnostic = () => {
  return useMutation((request: CreateDiagnosticRequest) =>
    diagnosticsApi.createDiagnostic(request),
  );
};

export { useCreateDiagnostic };
