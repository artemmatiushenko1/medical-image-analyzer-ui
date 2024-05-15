import { createStyleSheet } from '@/libs/theme';

const styles = createStyleSheet({
  root: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    color: ({ palette }) => palette.neutral.dark,
  },
});

export { styles };
