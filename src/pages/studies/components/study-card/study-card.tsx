import { ValueOf } from '@/libs/types';
import { StudyStatus } from '@/packages/studies';
import { EventNote, MoreHoriz, VisibilityRounded } from '@mui/icons-material';
import {
  Box,
  Button,
  IconButton,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import { styles } from './styles';
import { StudyStatusChip } from '../study-status-chip';
import { DetailItemText } from '../detail-item-text';
import dayjs from 'dayjs';
import { DateFormat } from '@/libs/enums';

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
      <DetailItemText iconComponent={EventNote}>
        {dayjs(date).format(DateFormat.DAY_ABBREV_MONTH_YEAR)}
      </DetailItemText>
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

StudyCard.Skeleton = () => {
  return (
    <Paper sx={styles.root}>
      <Skeleton width="100px" height={20} />
      <Box>
        <Skeleton
          height={65}
          width={120}
          variant="rounded"
          sx={{ borderRadius: ({ shape }) => shape.borderRadius }}
        />
      </Box>
      <Box>
        <Stack>
          <Skeleton width="100px" height={20} />
          <Skeleton width="140px" height={20} />
        </Stack>
      </Box>
      <Box sx={styles.rightPart}>
        <Skeleton
          variant="rounded"
          width={112}
          height={34}
          sx={{ borderRadius: '100px' }}
        />
        <Skeleton variant="circular" width={30} height={30} sx={{ mr: 1 }} />
      </Box>
    </Paper>
  );
};

export { StudyCard };
