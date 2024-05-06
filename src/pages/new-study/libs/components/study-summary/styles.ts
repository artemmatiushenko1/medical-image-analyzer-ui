import { createStyleSheet } from '@/libs/theme';
import { alpha } from '@mui/material';

const styles = createStyleSheet({
  root: {
    maxWidth: '800px',
    width: '100%',
    gap: 2,
    paddingTop: '50px',
    paddingBottom: 2,
    flexDirection: 'row',
  },
  sectionTitle: {
    color: ({ palette }) => palette.grey[400],
    marginBottom: 1,
  },
  diagnosticsWrapper: {
    p: 2,
    borderRadius: ({ shape }) => shape.borderRadius,
    gap: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  modelSettingChip: {
    fontSize: '12px',
    backgroundColor: 'transparent',
    color: ({ palette }) => palette.neutral.dark,
  },
  cropChip: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    fontSize: '12px',
    position: 'absolute',
    bottom: '10px',
    right: '10px',
    background: ({ palette }) => alpha(palette.primary.main, 0.4),
    color: ({ palette }) => palette.common.white,
    borderRadius: '100px',
    p: '2px 6px',
    border: ({ palette }) => `1px solid ${palette.primary.main}`,
  },
  imageWrapperPaper: {
    p: 2,
    borderRadius: ({ shape }) => shape.borderRadius,
    display: 'inline-block',
  },
  imageWrapper: {
    width: '200px',
    height: '200px',
    backgroundColor: ({ palette }) => palette.grey[200],
    border: ({ palette }) => `1px solid ${palette.divider}`,
    borderRadius: ({ shape }) => shape.borderRadius,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    height: '100%',
    objectFit: 'contain',
  },
});

export { styles };
