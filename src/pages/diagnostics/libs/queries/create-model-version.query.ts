import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DiagnosticQueryKey } from '../enums';
import {
  CreateModelVersionRequest,
  diagnosticsApi,
} from '@/packages/diagnostics';
import { useDiagnosticsStore } from '../../store';

const useCreateModelVersion = () => {
  const queryClient = useQueryClient();

  const selectedModel = useDiagnosticsStore((state) => state.selectedModel);
  const setSelectedModel = useDiagnosticsStore(
    (state) => state.setSelectedModel,
  );

  return useMutation({
    mutationFn: ({
      modelId,
      request,
    }: {
      modelId: string;
      request: CreateModelVersionRequest;
    }) => diagnosticsApi.createModelVersion(modelId, request),
    onSuccess: (data, { modelId }) => {
      if (selectedModel) {
        setSelectedModel(Object.assign(selectedModel, data));
      }

      return queryClient.invalidateQueries({
        queryKey: [...DiagnosticQueryKey.GET_MODEL, modelId],
        refetchType: 'all',
      });
    },
  });
};

export { useCreateModelVersion };
