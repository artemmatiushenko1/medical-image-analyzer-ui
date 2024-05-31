import { Model, useGetDiagnosticModels } from '@/packages/diagnostics';
import { Stack, Typography } from '@mui/material';
import { MAX_MODELS_LOADING_PREVIEWS } from './constants';
import { ModelCard } from '../model-card';
import { Button, Dialog } from '@/libs/components';
import { useDiagnosticDrawerStore } from '../../store';
import { DiagnosticDrawerStage } from '../../enums';

type ModelsListProps = {
  diagnosticId: string;
};

const ModelsList = (props: ModelsListProps) => {
  const { diagnosticId } = props;

  const { isLoading, data: diagnosticModels = [] } =
    useGetDiagnosticModels(diagnosticId);

  const navigateToNextStage = useDiagnosticDrawerStore(
    (state) => state.navigateToNextStage,
  );

  const setSelectedModel = useDiagnosticDrawerStore(
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
          startIcon={
            <svg
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              height="20px"
              width="20px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path>
              <path d="M12 12v9"></path>
              <path d="m16 16-4-4-4 4"></path>
            </svg>
          }
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
            version={model.version}
            enabled={model.enabled}
            onViewDetails={() => handleViewModelDetails(model)}
          />
        ))}
      </Stack>
    </Dialog.Content>
  );
};

export { ModelsList };
