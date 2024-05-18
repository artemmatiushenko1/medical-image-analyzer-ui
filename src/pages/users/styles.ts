import { createStyleSheet } from '@/libs/theme';

const styles = createStyleSheet({
  root: {
    height: '100%',
    background: '#fff',
    position: 'absolute',
    inset: 0,
  },
  contentWrapper: {
    margin: '0 auto',
    maxWidth: '600px',
    gap: 3,
  },
});

export { styles };
