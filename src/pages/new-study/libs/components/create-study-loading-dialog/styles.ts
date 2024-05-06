import { createStyleSheet } from '@/libs/theme';

const styles = createStyleSheet({
  successIconWrapper: {
    width: '50px',
    height: '50px',
    display: 'flex',
    alignItems: 'center',
    borderRadius: '100px',
    justifyContent: 'center',
    backgroundColor: ({ palette }) => palette.success.main,
    color: ({ palette }) => palette.common.white,
  },
  dialogContent: {
    py: 5,
    px: 5,
  },
});

export { styles };
