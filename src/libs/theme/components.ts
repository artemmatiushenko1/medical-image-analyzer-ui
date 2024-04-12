import { Components, Theme } from '@mui/material';
import { palette } from './palette';
import { shape } from './shape';

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
    styleOverrides: {
      root: {
        border: `1px solid ${palette.neutral.light}`,
      },
    },
    defaultProps: {
      elevation: 0,
      variant: 'outlined',
    },
  },
  MuiMenuItem: {
    defaultProps: {
      disableRipple: true,
    },
    styleOverrides: {
      root: {
        borderRadius: shape.borderRadius * 3,
        padding: '9px 10px',
      },
    },
  },
  MuiMenu: {
    styleOverrides: {
      list: {
        padding: 0,
      },
      paper: {
        overflow: 'visible',
        border: 'none',
        padding: 8,
        borderRadius: shape.borderRadius * 3,
        boxShadow:
          '0 1px 3px rgba(31,35,40,0.12), 0 8px 24px rgba(66,74,83,0.12)',
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
  MuiSwitch: {
    styleOverrides: {
      root: {
        padding: 0,
        borderRadius: '100px',
      },
      sizeSmall: {},
    },
  },
  MuiListItemIcon: {
    styleOverrides: {
      root: {
        color: '#c6ced8',
      },
    },
  },
  MuiSlider: {
    styleOverrides: {
      root: {
        height: '6px',
      },
      thumb: {
        height: '12px',
        width: '12px',
        backgroundColor: '#fff',
        '&.Mui-active': {
          boxShadow: '0px 0px 0px 10px rgba(60, 121, 254, 0.16)',
        },
      },
    },
  },
} satisfies Components<Omit<Theme, 'components'>>;

export { components };
