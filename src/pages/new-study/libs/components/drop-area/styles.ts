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
    transition: 'transform 0.2s ease',
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
  draggedOver: {
    transform: 'scale(0.95)',
    backgroundColor: ({ palette }) =>
      alpha(palette.primary.light, palette.action.selectedOpacity),
  },
  uploadedImgWrapper: {
    background: ({ palette }) => palette.common.black,
    width: '100%',
    height: '100%',
  },
  uploadedImg: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
});

export { styles };
