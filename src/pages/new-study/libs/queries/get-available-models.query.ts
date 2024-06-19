import { useQuery } from '@tanstack/react-query';
import { NewStudyQueryKey } from '../enums';
import {
  Diagnostic,
  Model,
  ModelExtended,
  diagnosticsApi,
} from '@/packages/diagnostics';

const useGetAvailableModels = () => {
  const { isLoading, data: availableModels = [] } = useQuery({
    queryKey: NewStudyQueryKey.GET_AVAILABLE_MODELS,
    queryFn: diagnosticsApi.getAvailableModels,
  });

  const diagnostics = availableModels
    ?.map((model) => model.type)
    .filter(
      (item, index, array) =>
        array.findIndex((i) => i.id === item.id) === index,
    );

  const diagnosticById = diagnostics.reduce(
    (acc, diagnostic) => ({ ...acc, [diagnostic.id]: diagnostic }),
    {} as Record<string, Diagnostic>,
  );

  const modelsById = availableModels.reduce(
    (acc, model) => ({ ...acc, [model.id]: model }),
    {} as Record<string, Model>,
  );

  const modelsByDiagnosticId = availableModels.reduce((acc, model) => {
    return { ...acc, [model.type.id]: [...(acc[model.type.id] ?? []), model] };
  }, {} as Record<string, ModelExtended[]>);

  return {
    isLoading,
    diagnostics,
    modelsByDiagnosticId,
    diagnosticById,
    modelsById,
  };
};

export { useGetAvailableModels };
