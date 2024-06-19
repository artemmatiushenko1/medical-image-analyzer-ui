import { CheckRounded, InfoOutlined } from '@mui/icons-material';
import { Box, Stack, Tooltip, Typography } from '@mui/material';

import { cardStyles as styles } from './styles';
import { mergeSx } from '@/libs/theme';

type DiagnosticCardProps = {
  title: string;
  imgSrc: string;
  onClick: () => void;
  selected?: boolean;
  disabled: boolean;
  description?: string;
};

const DiagnosticCard = (props: DiagnosticCardProps) => {
  const {
    selected = false,
    disabled = false,
    title,
    imgSrc,
    onClick,
    description,
  } = props;

  return (
    <Box
      onClick={onClick}
      sx={mergeSx(
        styles.root,
        selected && styles.selected,
        disabled && styles.disabled,
      )}
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
        <Stack>
          <Typography sx={styles.title}>{title}</Typography>
          {description && (
            <Typography variant="caption" maxWidth={170} noWrap>
              {description}
            </Typography>
          )}
        </Stack>
        {description && (
          <Tooltip title={description}>
            <InfoOutlined
              color="inherit"
              className="info-icon"
              sx={{ color: '#fff', fontSize: '16px', marginLeft: 'auto' }}
            />
          </Tooltip>
        )}
      </Box>
    </Box>
  );
};

export { DiagnosticCard };
