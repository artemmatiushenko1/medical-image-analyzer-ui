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
  MuiPaper: {
    defaultProps: {
      elevation: 0,
      variant: 'outlined',
      sx: {
        border: ({ palette }) => `1px solid ${palette.neutral.light}`,
      },
    },
  },
  MuiInputBase: {
    styleOverrides: {
      root: {
        borderRadius: '7px !important',
        '::before, ::after': {
          display: 'none',
        },
      },
    },
  },
} satisfies Components<Omit<Theme, 'components'>>;

export { components };
