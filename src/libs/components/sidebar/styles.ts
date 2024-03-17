import { createStyleSheet } from '@/libs/theme';

const styles = createStyleSheet({
  wrapper: {
    height: '100%',
    borderRight: ({ palette }) => `1px solid ${palette.neutral.light}`,
  },
  navItem: {
    padding: '8px 25px',
  },
  navItemSelected: {
    borderRight: ({ palette }) => `3px solid ${palette.primary.main}`,
  },
  navItemText: {
    fontWeight: 500,
  },
  navItemSubHeader: {
    lineHeight: '38px',
  },
  navItemIcon: {
    minWidth: '40px',
  },
});

export { styles };
