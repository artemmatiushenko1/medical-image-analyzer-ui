import { CheckRounded } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';

import { cardStyles as styles } from './styles';
import { mergeSx } from '@/libs/theme';

type DiagnosticCardProps = {
  selected?: boolean;
  title: string;
  imgSrc: string;
  onClick: () => void;
};

const DiagnosticCard = (props: DiagnosticCardProps) => {
  const { selected = false, title, imgSrc } = props;

  return (
    <Box sx={mergeSx(styles.root, selected && styles.selected)}>
      <Box component="img" sx={styles.image} src={imgSrc} alt={title} />
      {selected && (
        <Box sx={styles.selectedIconWrapperAbsolute}>
          <Box sx={styles.selectedIconWrapper}>
            <CheckRounded sx={styles.selectedIcon} />
          </Box>
        </Box>
      )}
      <Box sx={styles.infoOverlay}>
        <Typography sx={styles.title}>{title}</Typography>
      </Box>
    </Box>
  );
};

export { DiagnosticCard };
