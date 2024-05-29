import { createStyleSheet } from '@/libs/theme';
import { alpha } from '@mui/material';

const styles = createStyleSheet({
  root: {
    background: ({ palette }) => alpha(palette.neutral.light, 0.1),
  },
  content: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: '16px !important',
  },
});

export { styles };
