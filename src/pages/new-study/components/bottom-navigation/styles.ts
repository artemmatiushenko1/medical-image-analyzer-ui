import { createStyleSheet } from '@/libs/theme';

const styles = createStyleSheet({
  root: ({ shape }) => ({
    display: 'flex',
    padding: '14px',
    width: '100%',
    borderRadius: shape.borderRadius,
    justifyContent: 'space-between',
  }),
});

export { styles };
