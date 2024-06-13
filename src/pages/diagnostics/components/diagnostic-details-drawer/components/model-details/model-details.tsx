import { Button, Dialog } from '@/libs/components';
import { UploadIcon } from '@/libs/components/icons';
import { Stack, Typography } from '@mui/material';
import { ModelVersionHistory } from '../model-version-history';
import { useDiagnosticsStore } from '@/pages/diagnostics/store';
import { DiagnosticDrawerStage } from '@/pages/diagnostics/libs/enums';
import { useTranslation } from 'react-i18next';
import { useGetModelVersions } from '@/pages/diagnostics/libs/queries';

const ModelDetails = () => {
  const { t } = useTranslation('Diagnostics', {
    keyPrefix: 'DiagnosticsDrawer.Stages.ModelDetails',
  });

  const selectedModel = useDiagnosticsStore((state) => state.selectedModel);

  const navigateToNextStage = useDiagnosticsStore(
    (state) => state.navigateToNextStage,
  );
  const { isLoading, data: versionHistory = [] } = useGetModelVersions(
    selectedModel?.id,
  );

  const handleUploadNewVersionClick = () => {
    navigateToNextStage(DiagnosticDrawerStage.UPLOAD_MODEL_VERSION);
  };

  return (
    <Dialog.Content>
      <Stack spacing={3}>
        <Button
          fullWidth
          variant="contained"
          startIcon={<UploadIcon />}
          onClick={handleUploadNewVersionClick}
        >
          {t('UploadNewVersionButton')}
        </Button>
        <Stack>
          <Typography variant="subtitle2">
            {t('VersionHistoryLabel')}
          </Typography>
          <Typography variant="caption">
            {t('VersionHistoryCaption')}
          </Typography>
        </Stack>
        {isLoading ? (
          <Stack gap="40px">
            <ModelVersionHistory.Skeleton />
            <ModelVersionHistory.Skeleton />
            <ModelVersionHistory.Skeleton />
            <ModelVersionHistory.Skeleton />
            <ModelVersionHistory.Skeleton />
          </Stack>
        ) : null}
        {selectedModel && (
          <ModelVersionHistory
            currentVersionId={selectedModel.currentVersion.id}
            history={versionHistory}
          />
        )}
      </Stack>
    </Dialog.Content>
  );
};

export { ModelDetails };
