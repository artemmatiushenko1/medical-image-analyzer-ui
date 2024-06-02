import { createStyleSheet } from '@/libs/theme';

const styles = createStyleSheet({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    borderLeft: 'none',
    borderBottom: 'none',
    borderTop: 'none',
  },
  navItem: {
    color: ({ palette }) =>
      palette.mode === 'dark' ? palette.neutral.main : palette.neutral.dark,
    padding: '8px 25px',
  },
  navItemSelected: {
    color: ({ palette }) => palette.primary.dark,
    borderRight: ({ palette }) => `3px solid ${palette.primary.main}`,
  },
  navItemText: {
    color: 'inherit',
    fontWeight: 500,
  },
  navItemSubHeader: {
    lineHeight: '38px',
    color: ({ palette }) =>
      palette.mode === 'dark' ? palette.neutral.dark : palette.neutral.main,
  },
  navItemIcon: {
    color: ({ palette }) => palette.neutral.main,
    minWidth: '40px',
  },
  logoWrapper: {
    padding: '17.5px 25px',
  },
  divider: {
    mx: '16px',
  },
});

export { styles };
