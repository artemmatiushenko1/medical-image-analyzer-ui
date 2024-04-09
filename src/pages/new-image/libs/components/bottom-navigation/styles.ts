import { createStyleSheet } from '@/libs/theme';

const styles = createStyleSheet({
  root: ({ palette, shape }) => ({
    display: 'flex',
    padding: '14px',
    backgroundColor: palette.background.paper,
    width: '100%',
    borderRadius: shape.borderRadius,
    justifyContent: 'space-between',
    border: `1px solid ${palette.neutral.light}`,
  }),
});

export { styles };
