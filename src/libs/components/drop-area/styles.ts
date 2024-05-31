import { createStyleSheet } from '@/libs/theme';
import { alpha } from '@mui/material';

const styles = createStyleSheet({
  root: ({ palette, shape }) => ({
    gap: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: shape.borderRadius,
    position: 'relative',
    overflow: 'hidden',
    transition: 'transform 0.2s ease',
    border: `2px dashed transparent`,
    borderColor: palette.primary.main,
    background: alpha(palette.primary.main, palette.action.hoverOpacity),
  }),
  error: ({ palette }) => ({
    borderColor: palette.error.main,
    svg: {
      color: palette.error.main,
    },
  }),
  imageIcon: {
    fontSize: '50px',
  },
  input: {
    opacity: 0,
    position: 'absolute',
    inset: 0,
    cursor: 'pointer',
  },
  draggedOver: {
    transform: 'scale(0.95)',
    backgroundColor: ({ palette }) =>
      alpha(palette.primary.light, palette.action.selectedOpacity),
  },
  imageUploadHints: {
    display: 'flex',
    justifyContent: 'space-between',
  },
});

export { styles };
