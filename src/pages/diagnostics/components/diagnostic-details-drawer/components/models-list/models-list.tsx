import { Model, useGetDiagnosticModels } from '@/packages/diagnostics';
import { Stack, Typography } from '@mui/material';
import { MAX_MODELS_LOADING_PREVIEWS } from './constants';
import { ModelCard } from '../model-card';
import { Button, Dialog } from '@/libs/components';
import { UploadIcon } from '@/libs/components/icons';
import { useDiagnosticsStore } from '@/pages/diagnostics/store';
import { DiagnosticDrawerStage } from '@/pages/diagnostics/libs/enums';

const ModelsList = () => {
  const selectedDiagnostic = useDiagnosticsStore(
    (state) => state.selectedDiagnostic,
  );

  const { isLoading, data: diagnosticModels = [] } = useGetDiagnosticModels(
    selectedDiagnostic?.id,
  );

  const navigateToNextStage = useDiagnosticsStore(
    (state) => state.navigateToNextStage,
  );

  const setSelectedModel = useDiagnosticsStore(
    (state) => state.setSelectedModel,
  );

  const handleUploadNewModelClick = () => {
    navigateToNextStage(DiagnosticDrawerStage.UPLOAD_MODEL);
  };

  const handleViewModelDetails = (model: Model) => {
    navigateToNextStage(DiagnosticDrawerStage.MODEL_DETAILS);
    setSelectedModel(model);
  };

  return (
    <Dialog.Content sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Stack spacing={2}>
        <Button
          onClick={handleUploadNewModelClick}
          startIcon={<UploadIcon />}
          variant="contained"
          fullWidth
        >
          Upload new model
        </Button>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack>
            <Typography fontSize="14px" variant="subtitle2">
              Models
            </Typography>
            <Typography variant="caption">
              View and manage related AI models
            </Typography>
          </Stack>
        </Stack>
        {isLoading &&
          Array(MAX_MODELS_LOADING_PREVIEWS)
            .fill(crypto.randomUUID)
            .map((_, index) => <ModelCard.Skeleton key={index} />)}
        {diagnosticModels.map((model) => (
          <ModelCard
            name={model.name}
            key={model.id}
            version={model.currentVersion.revision}
            enabled={model.enabled}
            onViewDetails={() => handleViewModelDetails(model)}
          />
        ))}
      </Stack>
    </Dialog.Content>
  );
};

export { ModelsList };
