import { createStyleSheet } from '@/libs/theme';
import { alpha } from '@mui/material';

const styles = createStyleSheet({
  root: {
    gap: 1,
    maxWidth: '450px',
    width: '100%',
  },
  dropArea: ({ palette, shape }) => ({
    gap: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '450px',
    border: `2px dashed ${palette.primary.main}`,
    background: alpha(palette.primary.main, palette.action.hoverOpacity),
    borderRadius: shape.borderRadius,
    position: 'relative',
  }),
  imageIcon: {
    fontSize: '52px',
  },
  hints: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  input: {
    opacity: 0,
    position: 'absolute',
    inset: 0,
    cursor: 'pointer',
  },
});

export { styles };
