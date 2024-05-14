import { ValueOf } from '@/libs/types';
import { StudyStatus } from '@/packages/studies';
import { Box, Chip, Theme, Typography } from '@mui/material';
import { styles } from './styles';

type StudyStatusChip = {
  status: ValueOf<typeof StudyStatus>;
};

const StudyStatusChip = (props: StudyStatusChip) => {
  const { status } = props;

  const indicatorColor = ({ palette }: Theme) =>
    ({
      [StudyStatus.PENDING]: palette.warning.main,
      [StudyStatus.COMPLETED]: palette.success.main,
    }[status]);

  const statusText = {
    [StudyStatus.COMPLETED]: 'Completed',
    [StudyStatus.PENDING]: 'Pending',
  }[status];

  return (
    <Chip
      sx={styles.root}
      label={
        <Box sx={styles.label}>
          <Box
            sx={{
              ...styles.indicator,
              backgroundColor: indicatorColor,
            }}
          >
            &nbsp;
          </Box>
          <Typography fontSize="13px" fontWeight={500}>
            {statusText}
          </Typography>
        </Box>
      }
    />
  );
};

export { StudyStatusChip };
