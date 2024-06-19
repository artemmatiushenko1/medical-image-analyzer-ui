import { createStyleSheet } from '@/libs/theme';

const styles = createStyleSheet({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
  },
  leftSide: {
    flex: 0.55,
    backgroundColor: ({ palette }) => palette.primary.main,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  leftSideImage: {
    width: '85%',
  },
  rightSide: ({ breakpoints }) => ({
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    px: '20px',
    [breakpoints.up('md')]: {
      flex: 0.45,
    },
  }),
  form: {
    maxWidth: '400px',
    width: '100%',
  },
  controlsStack: {
    gap: 2,
  },
  formControl: {
    gap: 1,
  },
  motto: {
    position: 'absolute',
    bottom: '5%',
    left: '50%',
    color: ({ palette }) => palette.primary.contrastText,
    fontSize: '14px',
    transform: 'translateX(-50%)',
  },
});

export { styles };
