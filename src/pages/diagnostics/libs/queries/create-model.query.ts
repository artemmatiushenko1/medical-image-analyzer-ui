import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DiagnosticQueryKey } from '../enums';
import { CreateModelRequest, diagnosticsApi } from '@/packages/diagnostics';

const useCreateModel = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (request: CreateModelRequest & { file: File }) => {
      const { file, ...createModelPayload } = request;
      const createModelResponse = await diagnosticsApi.createModel(
        createModelPayload,
      );

      const createModelVersionResponse =
        await diagnosticsApi.createModelVersion(createModelResponse.id, {
          file,
          name: 'Initial release',
        });

      return createModelVersionResponse;
    },
    onSuccess: (_, { type }) =>
      queryClient.invalidateQueries({
        refetchType: 'all',
        queryKey: [...DiagnosticQueryKey.GET_DIAGNOSTIC_MODELS, type.id],
      }),
  });
};

export { useCreateModel };
