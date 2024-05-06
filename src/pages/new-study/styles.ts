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
});

export { styles };
