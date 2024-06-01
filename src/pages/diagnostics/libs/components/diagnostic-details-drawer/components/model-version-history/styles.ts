import { createStyleSheet } from '@/libs/theme';

const styles = createStyleSheet({
  root: {
    '.MuiStepConnector-root': { ml: '34px', mb: '-6px', mt: '-6px' },
    '.MuiStepConnector-line': { minHeight: '50px' },
  },
  step: { display: 'flex' },
  stepActive: {
    '& + .MuiStepConnector-root .MuiStepConnector-line': {
      borderColor: ({ palette }) => palette.primary.main,
    },
  },
  stepLabel: { gap: 2, padding: 0 },
  versionChipLabel: {
    width: '6px',
    height: '6px',
    backgroundColor: 'currentColor',
    borderRadius: '100px',
  },
  extraButton: { marginLeft: 'auto' },
});

export { styles };
