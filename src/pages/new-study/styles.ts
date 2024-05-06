import { createStyleSheet } from '@/libs/theme';

const styles = createStyleSheet({
  root: {
    display: 'flex',
    height: '100%',
    position: 'relative',
  },
  sidebar: {
    borderTop: 'none',
    flex: '22%',
  },
  main: {
    flex: '78%',
    p: 3,
  },
  stepBody: {
    flex: 1,
    height: 0,
    overflowY: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  header: {},
  imageUploadWrapper: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    alignSelf: 'center',
  },
  stepHeader: {
    px: 3,
    py: 2,
    marginLeft: -3,
    marginRight: -3,
    marginTop: -3,
    borderLeft: 'none',
    borderTop: 'none',
  },
  stepper: {
    p: 3,
  },
  sidebarHeader: {
    p: 3,
  },
});

export { styles };
