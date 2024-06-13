import { Model } from '@/packages/diagnostics';
import { Stack, Typography } from '@mui/material';
import { MAX_MODELS_LOADING_PREVIEWS } from './constants';
import { ModelCard } from '../model-card';
import { Button, Dialog } from '@/libs/components';
import { UploadIcon } from '@/libs/components/icons';
import { useDiagnosticsStore } from '@/pages/diagnostics/store';
import { DiagnosticDrawerStage } from '@/pages/diagnostics/libs/enums';
import { useTranslation } from 'react-i18next';
import { useGetDiagnosticModels } from '@/pages/diagnostics/libs/queries';

const ModelsList = () => {
  const { t } = useTranslation('Diagnostics');

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

  const loadingPreviews = Array.from<React.FC>({
    length: MAX_MODELS_LOADING_PREVIEWS,
  }).fill(ModelCard.Skeleton);

  return (
    <Dialog.Content sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Stack spacing={2}>
        <Button
          onClick={handleUploadNewModelClick}
          startIcon={<UploadIcon />}
          variant="contained"
          fullWidth
        >
          {t('DiagnosticsDrawer.Stages.DiagnosticDetails.UploadModelButton')}
        </Button>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack>
            <Typography fontSize="14px" variant="subtitle2">
              {t('DiagnosticsDrawer.Stages.DiagnosticDetails.Title')}
            </Typography>
            <Typography variant="caption">
              {t(
                'DiagnosticsDrawer.Stages.DiagnosticDetails.ViewAndManageRelatedAiModels',
              )}
            </Typography>
          </Stack>
        </Stack>
        {isLoading &&
          loadingPreviews.map((Preview, index) => <Preview key={index} />)}
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
