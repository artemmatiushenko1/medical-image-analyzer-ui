import { createStyleSheet } from '@/libs/theme';

const styles = createStyleSheet({
  appBar: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    borderLeft: 'none',
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
});

export { styles };
