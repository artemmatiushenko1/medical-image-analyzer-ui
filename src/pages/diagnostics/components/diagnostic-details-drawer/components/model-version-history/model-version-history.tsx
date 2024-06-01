import { mergeSx } from '@/libs/theme';
import { ModelVersion } from '@/packages/diagnostics';
import {
  Box,
  Button,
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
import { formatVersionString } from '@/pages/diagnostics/libs/helpers';
import { useTranslation } from 'react-i18next';

type ModelVersionHistoryProps = {
  currentVersionId: string;
  history: ModelVersion[];
};

const ModelVersionHistory = (props: ModelVersionHistoryProps) => {
  const { currentVersionId, history } = props;

  const { t } = useTranslation('Diagnostics', {
    keyPrefix: 'DiagnosticsDrawer.Stages.ModelDetails',
  });

  return (
    <Stepper orientation="vertical" sx={styles.root}>
      {history.map((version) => {
        const isActive = version.id === currentVersionId;
        const getColor = ({ palette }: Theme) =>
          isActive ? palette?.primary.main : palette.neutral.dark;

        return (
          <Step
            key={version.revision}
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
                        {formatVersionString(version.revision)}
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
              <Button disabled={isActive}>
                {isActive
                  ? t('CurrentVersionButton')
                  : t('RestoreVersionButton')}
              </Button>
            </Box>
          </Step>
        );
      })}
    </Stepper>
  );
};

ModelVersionHistory.Skeleton = () => {
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

export { ModelVersionHistory };
