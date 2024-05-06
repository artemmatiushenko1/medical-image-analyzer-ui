import { createStyleSheet } from '@/libs/theme';
import { alpha } from '@mui/material';

const styles = createStyleSheet({
  paper: {
    padding: 0.5,
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
  },
  radioGroup: {
    gap: 1,
  },
  languageItem: {
    justifyContent: 'space-between',
    margin: 0,
    borderRadius: ({ shape }) => shape.borderRadius,
    border: '1px solid transparent',
    padding: '10px 20px',
    ':hover:not(:has(.Mui-checked))': {
      background: ({ palette }) =>
        alpha(palette.primary.main, palette.action.hoverOpacity),
    },
  },
  languageItemSelected: {
    borderColor: ({ palette }) => palette.primary.main,
    background: ({ palette }) =>
      alpha(palette.primary.main, palette.action.selectedOpacity),
  },
  cancelButton: {
    color: ({ palette }) => palette.neutral.main,
  },
  actions: {
    p: '16px 24px',
  },
});

export { styles };
