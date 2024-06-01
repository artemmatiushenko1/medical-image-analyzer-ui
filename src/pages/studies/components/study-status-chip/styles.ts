import { createStyleSheet } from '@/libs/theme';

const styles = createStyleSheet({
  root: {
    backgroundColor: 'transparent',
    py: 2,
    border: ({ palette }) => `1px solid ${palette.divider}`,
    minWidth: '112px',
    '.MuiChip-label': {
      width: '100%',
    },
  },
  indicator: {
    width: '10px',
    height: '10px',
    borderRadius: 100,
  },
  label: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    justifyContent: 'space-evenly',
  },
});

export { styles };
