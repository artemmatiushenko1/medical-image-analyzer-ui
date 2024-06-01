import { createStyleSheet } from '@/libs/theme';

const styles = createStyleSheet({
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
  signInButton: {
    marginTop: 4,
  },
  logoWrapper: {
    marginBottom: 8,
  },
  formControlLabel: {
    fontSize: '14px',
  },
  input: {
    fontSize: '12px',
  },
});

export { styles };
