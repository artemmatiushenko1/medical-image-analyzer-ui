import { Button, Dialog } from '@/libs/components';
import { UploadIcon } from '@/libs/components/icons';
import { Stack, Typography } from '@mui/material';
import { ModelVersionHistory } from '../model-version-history';
import { useGetModelVersions } from '@/packages/diagnostics';
import { useDiagnosticDrawerStore } from '@/pages/diagnostics/diagnostic-drawer.store';
import { DiagnosticDrawerStage } from '@/pages/diagnostics/libs/enums';

const ModelDetails = () => {
  const selectedModel = useDiagnosticDrawerStore(
    (state) => state.selectedModel,
  );
  const navigateToNextStage = useDiagnosticDrawerStore(
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
          Upload new version
        </Button>
        <Stack>
          <Typography variant="subtitle2">Version History</Typography>
          <Typography variant="caption">
            All the existing model versions listed below.
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
