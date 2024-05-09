import { ValueOf } from '@/libs/types';
import { StudyStatus } from '@/packages/studies';
import { EventNote, MoreHoriz } from '@mui/icons-material';
import { Box, Chip, IconButton, Paper, Stack, Typography } from '@mui/material';
import { styles } from './styles';

type StudyCardProps = {
  date: string;
  name: string;
  imageSrc: string;
  diagnostics: string[];
  status: ValueOf<typeof StudyStatus>;
};

const StudyCard = (props: StudyCardProps) => {
  const { date, imageSrc } = props;

  return (
    <Paper sx={styles.root}>
      <Box sx={styles.dateColumn}>
        <EventNote fontSize="inherit" />
        <Typography variant="caption">{date}</Typography>
      </Box>
      <Box>
        <Box sx={styles.imageWrapper}>
          <Box src={imageSrc} component="img" sx={styles.image} />
        </Box>
      </Box>
      <Stack>
        <Typography variant="caption">Name</Typography>
        <Typography variant="subtitle2" fontWeight={600}>
          Lungs study
        </Typography>
      </Stack>
      <Stack>
        <Typography variant="caption">Diagnostics</Typography>
        <Stack>
          <Typography variant="subtitle2" fontWeight={600}>
            Детекція аномалій в легенях
          </Typography>
          <Typography variant="caption">2+ more</Typography>
        </Stack>
      </Stack>
      <Box sx={styles.rightPart}>
        <Chip
          sx={{
            backgroundColor: 'transparent',
            py: 2,
            border: ({ palette }) => `1px solid ${palette.divider}`,
          }}
          label={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box
                sx={{
                  width: '10px',
                  height: '10px',
                  borderRadius: 100,
                  backgroundColor: ({ palette }) => palette.success.main,
                }}
              >
                &nbsp;
              </Box>
              <Typography fontSize="13px" fontWeight={500}>
                Completed
              </Typography>
            </Box>
          }
        />
        <IconButton>
          <MoreHoriz />
        </IconButton>
      </Box>
    </Paper>
  );
};

export { StudyCard };
