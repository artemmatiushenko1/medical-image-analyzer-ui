import { createStyleSheet } from '@/libs/theme';

const styles = createStyleSheet({
  root: {
    height: '100%',
    position: 'relative',
    display: 'flex',
  },
  contentWrapper: {
    gap: 3,
    transition: 'margin-right 0.2s ease',
    flex: 1,
    width: 0,
  },
});

export { styles };
