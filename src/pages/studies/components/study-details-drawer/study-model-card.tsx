import { HighlightedIcon } from '@/libs/components';
import { AiModelIcon } from '@/libs/components/icons';
import { formatVersionString } from '@/libs/helpers';
import { Box, Paper, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

type StudyModelCardProps = {
  modelName: string;
  version?: number;
};

const StudyModelCard = (props: StudyModelCardProps) => {
  const { modelName, version } = props;

  const { t } = useTranslation('Studies');

  return (
    <Paper sx={{ p: 2 }}>
      <Stack>
        <Stack direction="row" gap={3} alignItems="center">
          <Box>
            <HighlightedIcon rounded iconElement={<AiModelIcon />} />
          </Box>
          <Stack>
            <Typography variant="body2">{modelName}</Typography>
            <Typography variant="caption">
              {t('StudyModelCard.Name')}
            </Typography>
          </Stack>
          {version && (
            <Stack sx={{ marginLeft: 'auto' }}>
              <Typography variant="body2" textAlign="right">
                {formatVersionString(version)}
              </Typography>
              <Typography variant="caption">
                {t('StudyModelCard.Version')}
              </Typography>
            </Stack>
          )}
        </Stack>
      </Stack>
    </Paper>
  );
};

export { StudyModelCard };
