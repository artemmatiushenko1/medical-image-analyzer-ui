import { mergeSx } from '@/libs/theme';
import { ModelVersion } from '@/packages/diagnostics';
import {
  Box,
  Button,
  Chip,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Theme,
  Typography,
  alpha,
} from '@mui/material';
import { styles } from './styles';

type ModelVersionHistoryProps = {
  currentVersionId: string;
  history: ModelVersion[];
};

const ModelVersionHistory = (props: ModelVersionHistoryProps) => {
  const { currentVersionId, history } = props;

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
                      <Typography
                        fontSize="inherit"
                        color="text.primary"
                      >{`v${version.revision}.0`}</Typography>
                    </Stack>
                  }
                />
              )}
              optional={
                <Typography variant="caption">{version.createdAt}</Typography>
              }
            >
              {version.name}
            </StepLabel>
            <Box sx={styles.extraButton}>
              <Button disabled={isActive}>
                {isActive ? 'Current' : 'Restore'}
              </Button>
            </Box>
          </Step>
        );
      })}
    </Stepper>
  );
};

export { ModelVersionHistory };
