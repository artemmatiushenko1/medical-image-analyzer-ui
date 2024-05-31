import { Button, Dialog } from '@/libs/components';
import { mergeSx } from '@/libs/theme';
import {
  Box,
  Chip,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Theme,
  Typography,
  alpha,
} from '@mui/material';

const ModelDetails = () => {
  const versions = [
    {
      revision: 10,
      name: 'Increased precision',
      createdAt: '15 Mar 2024',
    },
    {
      revision: 9,
      name: 'Increased precision',
      createdAt: '15 Mar 2024',
    },
    {
      revision: 8,
      name: 'Increased precision',
      createdAt: '15 Mar 2024',
    },
    {
      revision: 7,
      name: 'Increased precision',
      createdAt: '15 Mar 2024',
    },
    {
      revision: 6,
      name: 'Increased precision',
      createdAt: '15 Mar 2024',
    },
    {
      revision: 5,
      name: 'Increased precision',
      createdAt: '15 Mar 2024',
    },
    {
      revision: 4,
      name: 'Increased precision',
      createdAt: '15 Mar 2024',
    },
    {
      revision: 3,
      name: 'Increased precision',
      createdAt: '15 Mar 2024',
    },
    {
      revision: 2,
      name: 'Increased precision',
      createdAt: '15 Mar 2024',
    },
    {
      revision: 1,
      name: 'Increased precision',
      createdAt: '15 Mar 2024',
    },
  ];

  const activeVersion = 10;

  return (
    <Dialog.Content>
      <Stack spacing={3}>
        <Button fullWidth variant="contained">
          Upload new version
        </Button>
        <Stack>
          <Typography variant="subtitle2">Version History</Typography>
          <Typography variant="caption">
            All the existing model versions listed below.
          </Typography>
        </Stack>
        <Stepper
          orientation="vertical"
          sx={{
            '.MuiStepConnector-root': { ml: '34px', mb: '-6px', mt: '-6px' },
            '.MuiStepConnector-line': { minHeight: '50px' },
          }}
        >
          {versions.map((version) => {
            const isActive = version.revision === activeVersion;
            const getColor = ({ palette }: Theme) =>
              isActive ? palette?.primary.main : palette.neutral.dark;

            return (
              <Step
                key={version.revision}
                sx={mergeSx(
                  { display: 'flex' },
                  isActive && {
                    '& + .MuiStepConnector-root .MuiStepConnector-line': {
                      borderColor: ({ palette }) => palette.primary.main,
                    },
                  },
                )}
              >
                <StepLabel
                  sx={{ gap: 2, padding: 0 }}
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
                          <Box
                            sx={{
                              width: '6px',
                              height: '6px',
                              backgroundColor: 'currentColor',
                              borderRadius: '100px',
                            }}
                          />
                          <Typography
                            fontSize="inherit"
                            color="text.primary"
                          >{`v${version.revision}.0`}</Typography>
                        </Stack>
                      }
                    />
                  )}
                  optional={
                    <Typography variant="caption">
                      {version.createdAt}
                    </Typography>
                  }
                >
                  {version.name}
                </StepLabel>
                <Box sx={{ marginLeft: 'auto' }}>
                  <Button disabled={isActive}>
                    {isActive ? 'Current' : 'Restore'}
                  </Button>
                </Box>
              </Step>
            );
          })}
        </Stepper>
      </Stack>
    </Dialog.Content>
  );
};

export { ModelDetails };
