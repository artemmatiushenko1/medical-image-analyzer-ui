import { HighlightedIcon } from '@/libs/components';
import { MonitorHeartOutlined } from '@mui/icons-material';
import { Box, Paper, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

type StudyDiagnosticCardProps = {
  name: string;
};

const StudyDiagnosticCard = (props: StudyDiagnosticCardProps) => {
  const { name } = props;

  const { t } = useTranslation('Studies');

  return (
    <Paper sx={{ p: 2 }}>
      <Stack>
        <Stack direction="row" gap={3} alignItems="center">
          <Box>
            <HighlightedIcon rounded iconElement={<MonitorHeartOutlined />} />
          </Box>
          <Stack>
            <Typography variant="body2">{name}</Typography>
            <Typography variant="caption">
              {t('StudyDiagnosticCard.Name')}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
};

export { StudyDiagnosticCard };
