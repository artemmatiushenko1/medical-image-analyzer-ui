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
  Tooltip,
  Typography,
} from '@mui/material';
import { styles } from './styles';
import { StudyStatusChip } from '../study-status-chip';
import { DetailItemText } from '../detail-item-text';
import dayjs from 'dayjs';
import { DateFormat } from '@/libs/enums';
import { useTranslation } from 'react-i18next';
import { StudyCardActions } from '../study-card-actions';
import { useMenuPopover } from '@/libs/hooks';

type StudyCardProps = {
  id: string;
  date: string;
  imageSrc: string;
  name: string;
  description?: string;
  status: ValueOf<typeof StudyStatus>;

  onViewDetails: (id: string) => void;
};

const StudyCard = (props: StudyCardProps) => {
  const { date, imageSrc, status, name, id, onViewDetails, description } =
    props;

  const {
    anchorEl: menuAchorEl,
    open: menuOpen,
    openMenu,
    closeMenu,
  } = useMenuPopover();

  const { t } = useTranslation('Studies');

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
      <Stack maxWidth={200} width={'100%'}>
        <Typography variant="caption">Name</Typography>
        <Typography noWrap variant="subtitle2" fontWeight={600}>
          {name}
        </Typography>
      </Stack>
      {description && (
        <Stack>
          <Typography variant="caption">Description</Typography>
          <Stack>
            <Typography variant="subtitle2" fontWeight={600}>
              {description}
            </Typography>
          </Stack>
        </Stack>
      )}
      <Box sx={styles.rightPart}>
        <Button
          sx={styles.viewStudyButton}
          className="view-study-button"
          onClick={handleViewDetails}
          startIcon={<VisibilityRounded />}
        >
          {t('StudyCard.ViewDetails')}
        </Button>
        <StudyStatusChip status={status} />
        <Tooltip title={t('StudyCard.Actions')}>
          <IconButton onClick={openMenu}>
            <MoreHoriz />
          </IconButton>
        </Tooltip>
      </Box>
      <StudyCardActions
        studyId={id}
        anchorEl={menuAchorEl}
        open={menuOpen}
        onClose={closeMenu}
      />
    </Paper>
  );
};

const StudyCardSkeleton = () => {
  return (
    <Paper sx={styles.root}>
      <Skeleton width="94px" height={20} />
      <Box>
        <Skeleton
          height={65}
          width={120}
          variant="rounded"
          sx={{ borderRadius: ({ shape }) => shape.borderRadius }}
        />
      </Box>
      <Stack maxWidth={200} width={'100%'}>
        <Skeleton width="100px" height={20} />
        <Skeleton width="140px" height={20} />
      </Stack>
      <Stack>
        <Skeleton width="100px" height={20} />
        <Skeleton width="140px" height={20} />
      </Stack>
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

StudyCard.Skeleton = StudyCardSkeleton;

export { StudyCard };
