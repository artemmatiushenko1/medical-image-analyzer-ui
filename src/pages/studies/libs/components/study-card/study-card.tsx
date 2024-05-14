import { ValueOf } from '@/libs/types';
import { StudyStatus } from '@/packages/studies';
import { EventNote, MoreHoriz, VisibilityRounded } from '@mui/icons-material';
import {
  Box,
  Button,
  IconButton,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { styles } from './styles';
import { StudyStatusChip } from '../study-status-chip';

type StudyCardProps = {
  date: string;
  name: string;
  imageSrc: string;
  diagnostics: string[];
  status: ValueOf<typeof StudyStatus>;
};

const StudyCard = (props: StudyCardProps) => {
  const { date, imageSrc, status, name, diagnostics } = props;

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
          {name}
        </Typography>
      </Stack>
      <Stack>
        <Typography variant="caption">Diagnostics</Typography>
        <Stack>
          <Typography variant="subtitle2" fontWeight={600}>
            {diagnostics[0]}
          </Typography>
          {diagnostics.length > 1 && (
            <Typography variant="caption">
              {diagnostics.length - 1}+ more
            </Typography>
          )}
        </Stack>
      </Stack>
      <Box sx={styles.rightPart}>
        <Button
          sx={styles.viewStudyButton}
          className="view-study-button"
          startIcon={<VisibilityRounded />}
        >
          View details
        </Button>
        <StudyStatusChip status={status} />
        <IconButton>
          <MoreHoriz />
        </IconButton>
      </Box>
    </Paper>
  );
};

export { StudyCard };
