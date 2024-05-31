import { useMutation } from 'react-query';
import { CreateModelRequest } from '../types';
import { diagnosticsApi } from '../diagnostics.api';

const useCreateModel = () => {
  return useMutation({
    mutationFn: ({
      diagnosticId,
      request,
    }: {
      diagnosticId: string;
      request: CreateModelRequest;
    }) => diagnosticsApi.createModel(diagnosticId, request),
  });
};

export { useCreateModel };
