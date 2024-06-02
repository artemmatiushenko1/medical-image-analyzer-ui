import { createStyleSheet } from '@/libs/theme';

const styles = createStyleSheet({
  appBar: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    borderLeft: 'none',
    borderRight: 'none',
    borderTop: 'none',
    px: 2,
    backgroundColor: ({ palette }) => palette.background.paper,
  },
  innerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0 0 0 10px',
    alignItems: 'center',
  },
  collapseSidebarIcon: {
    transform: 'scaleX(-1)',
  },
  collapseSidebarIconInactive: {
    fill: ({ palette }) => palette.grey[400],
  },
  collapseSidebarIconActive: {
    fill: ({ palette }) => palette.primary.main,
  },
  notificationIcon: {
    fill: ({ palette }) => palette.grey[400],
  },
  logoWrapper: {
    mr: 6,
  },
  navigationButtons: { display: 'flex', gap: 1, marginRight: 'auto' },
});

export { styles };
