import { createStyleSheet } from '@/libs/theme';

const styles = createStyleSheet({
  root: {
    maxWidth: '1150px',
    margin: '0 auto',
    height: '100%',
    gap: 2,
    position: 'relative',
  },
  stepBody: {
    flex: 1,
    height: 0,
    overflowY: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
  },
});

export { styles };
