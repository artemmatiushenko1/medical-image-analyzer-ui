import { createStyleSheet } from '@/libs/theme';
import { alpha } from '@mui/material';

const styles = createStyleSheet({
  root: ({ palette, shape }) => ({
    gap: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '450px',
    height: '450px',
    border: `2px dashed transparent`,
    background: alpha(palette.primary.main, palette.action.hoverOpacity),
    borderRadius: shape.borderRadius,
    position: 'relative',
    overflow: 'hidden',
  }),
  noImage: {
    borderColor: ({ palette }) => palette.primary.main,
  },
  imageIcon: {
    fontSize: '52px',
  },
  input: {
    opacity: 0,
    position: 'absolute',
    inset: 0,
    cursor: 'pointer',
  },
});

export { styles };
