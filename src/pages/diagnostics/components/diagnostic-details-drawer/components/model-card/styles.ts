import { createStyleSheet } from '@/libs/theme';
import { alpha } from '@mui/material';

const styles = createStyleSheet({
  root: {
    background: ({ palette }) => alpha(palette.neutral.light, 0.05),
  },
  content: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export { styles };
