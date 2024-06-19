import { mergeSx } from '@/libs/theme';
import { ModelVersion, ModelVersionStatus } from '@/packages/diagnostics';
import {
  Box,
  Chip,
  Skeleton,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Theme,
  Typography,
  alpha,
} from '@mui/material';
import { styles } from './styles';
import dayjs from 'dayjs';
import { DateFormat } from '@/libs/enums';
import { formatVersionString } from '@/libs/helpers';
import { useTranslation } from 'react-i18next';
import { useChangeModelVersionStatus } from '@/pages/diagnostics/libs/queries';
import { Button } from '@/libs/components';

type ModelVersionHistoryProps = {
  modelId: string;
  currentVersion: ModelVersion;
  history: ModelVersion[];
};

const ModelVersionHistory = (props: ModelVersionHistoryProps) => {
  const { currentVersion, history, modelId } = props;

  const { t } = useTranslation(['Diagnostics', 'Common']);

  const {
    mutate: changeModelVersionStatus,
    isPending,
    variables,
  } = useChangeModelVersionStatus();

  const handleDisableVersion = (versionId: string) => {
    changeModelVersionStatus({
      versionId,
      modelId: modelId,
      status: ModelVersionStatus.DISABLED,
    });
  };

  const handleEnableVersion = (versionId: string) => {
    changeModelVersionStatus({
      versionId,
      modelId: modelId,
      status: ModelVersionStatus.ENABLED,
    });
  };

  return (
    <Stepper orientation="vertical" sx={styles.root}>
      {history.map((version) => {
        const isActive = version.id === currentVersion.id;
        const getColor = ({ palette }: Theme) =>
          isActive ? palette?.primary.main : palette.neutral.dark;

        return (
          <Step
            key={version.id}
            sx={mergeSx(styles.step, isActive && styles.stepActive)}
          >
            <StepLabel
              sx={styles.stepLabel}
              StepIconComponent={() => (
                <Chip
                  sx={{
                    color: getColor,
                    backgroundColor: (theme) => alpha(getColor(theme), 0.1),
                    border: (theme) => `1px solid ${getColor(theme)}`,
                  }}
                  disabled={!isActive}
                  color={!isActive ? 'default' : 'primary'}
                  label={
                    <Stack direction="row" alignItems="center" gap={1}>
                      <Box sx={styles.versionChipLabel} />
                      <Typography fontSize="inherit" color="text.primary">
                        {formatVersionString(version.version)}
                      </Typography>
                    </Stack>
                  }
                />
              )}
              optional={
                <Typography variant="caption">
                  {dayjs(version.createdAt).format(
                    DateFormat.DAY_ABBREV_MONTH_YEAR,
                  )}
                </Typography>
              }
            >
              {version.name}
            </StepLabel>
            <Box sx={styles.extraButton}>
              {isActive && (
                <Button disabled={isActive}>
                  {t(
                    'DiagnosticsDrawer.Stages.ModelDetails.CurrentVersionButton',
                  )}
                </Button>
              )}
              {version.version > currentVersion.version && (
                <Button
                  onClick={() => handleEnableVersion(version.id)}
                  isLoading={
                    isPending &&
                    variables.versionId === version.id &&
                    variables.status === ModelVersionStatus.ENABLED
                  }
                >
                  {t(
                    'DiagnosticsDrawer.Stages.ModelDetails.RestoreVersionButton',
                  )}
                </Button>
              )}
              {version.version === currentVersion.version && (
                <Button
                  color="error"
                  onClick={() => handleDisableVersion(version.id)}
                  isLoading={
                    isPending &&
                    version.id === variables.versionId &&
                    variables.status === ModelVersionStatus.DISABLED
                  }
                >
                  {t('Disable', { ns: 'Common' })}
                </Button>
              )}
            </Box>
          </Step>
        );
      })}
    </Stepper>
  );
};

const ModelVersionHistorySkeleton = () => {
  return (
    <Stack direction="row" alignItems="center" gap="16px">
      <Skeleton
        sx={{ borderRadius: '100px' }}
        variant="rounded"
        height={32}
        width={66}
      />
      <Stack flex={1}>
        <Typography variant="subtitle2">
          <Skeleton />
        </Typography>
        <Typography variant="caption">
          <Skeleton />
        </Typography>
      </Stack>
      <Skeleton>
        <Button>Restore</Button>
      </Skeleton>
    </Stack>
  );
};

ModelVersionHistory.Skeleton = ModelVersionHistorySkeleton;

export { ModelVersionHistory };
