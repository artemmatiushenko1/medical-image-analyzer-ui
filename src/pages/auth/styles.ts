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
  },
  leftSideImage: {
    width: '85%',
  },
  rightSide: {
    flex: 0.45,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
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
});

export { styles };
