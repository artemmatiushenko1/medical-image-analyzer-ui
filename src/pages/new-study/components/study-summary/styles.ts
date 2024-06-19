import { createStyleSheet } from '@/libs/theme';
import { heather } from '@/libs/theme/colors';

const styles = createStyleSheet({
  root: {
    maxWidth: '800px',
    width: '100%',
    gap: 2,
    paddingTop: '50px',
    paddingBottom: 2,
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
    padding: 1,
    backgroundColor: heather[100],
    color: heather[800],
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
