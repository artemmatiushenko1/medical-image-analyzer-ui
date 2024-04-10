import { createStyleSheet } from '@/libs/theme';
import { alpha } from '@mui/material';

const styles = createStyleSheet({
  root: {
    gap: 1,
  },
  hints: {
    display: 'flex',
    justifyContent: 'space-between',
  },
});

export { styles };
