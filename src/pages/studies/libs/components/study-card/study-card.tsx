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
import { DetailItemText } from '../detail-item-text';

type StudyCardProps = {
  id: string;
  date: string;
  imageSrc: string;
  diagnostic: string;
  status: ValueOf<typeof StudyStatus>;

  onViewDetails: (id: string) => void;
};

const StudyCard = (props: StudyCardProps) => {
  const { date, imageSrc, status, diagnostic, id, onViewDetails } = props;

  const handleViewDetails = () => {
    onViewDetails(id);
  };

  return (
    <Paper sx={styles.root}>
      <DetailItemText iconComponent={EventNote}>{date}</DetailItemText>
      <Box>
        <Box sx={styles.imageWrapper}>
          <Box src={imageSrc} component="img" sx={styles.image} />
        </Box>
      </Box>
      <Stack>
        <Typography variant="caption">Diagnostic</Typography>
        <Stack>
          <Typography variant="subtitle2" fontWeight={600}>
            {diagnostic}
          </Typography>
        </Stack>
      </Stack>
      <Box sx={styles.rightPart}>
        <Button
          sx={styles.viewStudyButton}
          className="view-study-button"
          onClick={handleViewDetails}
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