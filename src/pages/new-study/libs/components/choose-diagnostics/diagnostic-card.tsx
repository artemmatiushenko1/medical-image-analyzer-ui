import { CheckRounded } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';

import { cardStyles as styles } from './styles';
import { mergeSx } from '@/libs/theme';

type DiagnosticCardProps = {
  title: string;
  imgSrc: string;
  onClick: () => void;
  selected?: boolean;
};

const DiagnosticCard = (props: DiagnosticCardProps) => {
  const { selected = false, title, imgSrc, onClick } = props;

  return (
    <Box
      onClick={onClick}
      sx={mergeSx(styles.root, selected && styles.selected)}
    >
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
