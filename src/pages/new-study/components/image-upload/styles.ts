import { createStyleSheet } from '@/libs/theme';
import { Theme } from '@mui/material';

const styles = createStyleSheet({
  root: {
    gap: 1,
    width: '100%',
    maxWidth: '450px',
  },
  uploadedImgWrapper: (theme: Theme) => ({
    maxWidth: '450px',
    width: '100%',
    borderRadius: ({ shape }) => shape.borderRadius,
    overflow: 'hidden',
    [theme.breakpoints.up('md')]: {
      height: '450px',
      aspectRatio: 1 / 1,
    },
  }),
  uploadedImg: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    display: 'block',
  },
});

export { styles };
