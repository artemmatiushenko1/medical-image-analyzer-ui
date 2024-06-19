import { Button, Dialog } from '@/libs/components';
import { CopyIcon, UploadIcon } from '@/libs/components/icons';
import { Stack, Tooltip, Typography, alpha } from '@mui/material';
import { ModelVersionHistory } from '../model-version-history';
import { useDiagnosticsStore } from '@/pages/diagnostics/store';
import { DiagnosticDrawerStage } from '@/pages/diagnostics/libs/enums';
import { useTranslation } from 'react-i18next';
import { useGetModel } from '@/pages/diagnostics/libs/queries';
import { useClipboard } from '@/libs/hooks';

const ModelDetails = () => {
  const { t } = useTranslation('Diagnostics', {
    keyPrefix: 'DiagnosticsDrawer.Stages.ModelDetails',
  });

  const { t: tCommon } = useTranslation('Common');

  const { copy } = useClipboard();

  const selectedModel = useDiagnosticsStore((state) => state.selectedModel);

  if (!selectedModel) {
    throw new Error('Selected model must be set!');
  }

  const navigateToNextStage = useDiagnosticsStore(
    (state) => state.navigateToNextStage,
  );
  const { isLoading, data } = useGetModel(selectedModel?.id);

  const { versions = [] } = data ?? {};

  const handleUploadNewVersionClick = () => {
    navigateToNextStage(DiagnosticDrawerStage.UPLOAD_MODEL_VERSION);
  };

  const handleCopyQueueName = () => {
    copy(selectedModel.queueName, t('QueueNameCopiedMessage'));
  };

  return (
    <Dialog.Content>
      <Stack spacing={3}>
        {selectedModel.description && (
          <Typography variant="caption">{selectedModel.description}</Typography>
        )}
        <Stack direction="row" justifyContent="space-between">
          <Stack>
            <Typography variant="subtitle2" gutterBottom={false}>
              {t('Queue')}
            </Typography>
            <Typography variant="caption">{t('QueueDescription')}</Typography>
          </Stack>
          <Tooltip title={tCommon('CopyToClipboard')}>
            <Button
              variant="text"
              sx={{
                borderRadius: '100px',
                px: 2,
                alignSelf: 'center',
                background: ({ palette }) =>
                  alpha(palette.primary.main, palette.action.selectedOpacity),
              }}
              endIcon={<CopyIcon />}
              onClick={handleCopyQueueName}
            >
              <Typography maxWidth={120} noWrap sx={{ fontSize: '14px' }}>
                {selectedModel.queueName}
              </Typography>
            </Button>
          </Tooltip>
        </Stack>
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
        {data?.currentVersion && (
          <ModelVersionHistory
            history={versions}
            modelId={selectedModel.id}
            currentVersion={data.currentVersion}
          />
        )}
      </Stack>
    </Dialog.Content>
  );
};

export { ModelDetails };
