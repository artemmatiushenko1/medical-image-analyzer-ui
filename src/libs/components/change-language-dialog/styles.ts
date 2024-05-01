import { createStyleSheet } from '@/libs/theme';
import { alpha } from '@mui/material';

const styles = createStyleSheet({
  paper: {
    borderRadius: ({ shape }) => shape.borderRadius,
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
});

export { styles };
