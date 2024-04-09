import { createStyleSheet } from '@/libs/theme';

const styles = createStyleSheet({
  root: { maxWidth: '1200px', margin: '0 auto', height: '100%' },
  stepBody: {
    flex: 1,
    height: 0,
    overflowY: 'auto',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
  },
});

export { styles };
