import { Components, Theme } from '@mui/material';

const components = {
  MuiButton: {
    defaultProps: {
      disableElevation: true,
    },
    styleOverrides: {
      root: {
        textTransform: 'capitalize',
        borderRadius: '7px',
      },
    },
  },
} satisfies Components<Omit<Theme, 'components'>>;

export { components };
