import { createStyleSheet } from '@/libs/theme';

const styles = createStyleSheet({
  root: { maxWidth: '1200px', margin: '0 auto', height: '100%', gap: 2 },
  stepBody: {
    flex: 1,
    height: 0,
    overflowY: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
  },
});

export { styles };
