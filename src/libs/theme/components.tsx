import { Components, Theme, alpha } from '@mui/material';
import { shape } from './shape';
import { heather } from './colors';
import { NavigateNextRounded } from '@mui/icons-material';

const getComponentsOverrides = (palette: Theme['palette']) =>
  ({
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
        rounded: (props) => ({
          borderRadius: !props.square ? shape.borderRadius * 3 : 0,
        }),
        root: {
          border: `1px solid ${alpha(
            palette.neutral.light,
            palette.mode === 'dark' ? 0.1 : 1,
          )}`,
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
      defaultProps: {
        slotProps: { paper: { variant: 'elevation', elevation: 4 } },
      },
      styleOverrides: {
        list: {
          padding: 0,
        },
        paper: {
          overflow: 'visible',
          padding: 8,
          borderRadius: shape.borderRadius * 3,
          border: palette.mode === 'light' ? 'none' : undefined,
          boxShadow:
            palette.mode === 'dark'
              ? undefined
              : '0 1px 3px rgba(31,35,40,0.12), 0 8px 24px rgba(66,74,83,0.12)',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontSize: '15px',
          borderRadius: '7px !important',
          '::before, ::after': {
            display: 'none',
          },
          ':hover:not(&.Mui-focused, :has(.Mui-disabled)) .MuiOutlinedInput-notchedOutline':
            {
              borderColor: palette.neutral.main,
            },
          '.MuiOutlinedInput-notchedOutline': {
            borderColor: alpha(
              palette.neutral.light,
              palette.mode === 'dark' ? 0.4 : 1,
            ),
          },
          'input::placeholder, textarea::placeholder': {
            color: palette.mode === 'dark' ? heather[400] : heather[700],
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '.MuiInputAdornment-root': {
            color: heather[400],
          },
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          padding: 0,
          borderRadius: '100px',
          '&& .Mui-checked+.MuiSwitch-track': {
            opacity: 1,
          },
        },
        thumb: {
          color: '#fff',
        },
        track: {
          backgroundColor: heather[600],
        },
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
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 9,
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontSize: '14px',
          color: palette.neutral.dark,
          // '&:not(.MuiInputLabel-shrink)': {
          //   opacity: 0.5,
          //   color: palette.mode === 'dark' ? heather[400] : heather[700],
          // },
        },
      },
    },
    MuiBreadcrumbs: {
      styleOverrides: {
        root: {
          color: heather[400],
          fontSize: '14px',
          '.MuiTypography-root': { fontSize: 'inherit' },
        },
      },
      defaultProps: {
        separator: <NavigateNextRounded fontSize="small" />,
      },
    },
    MuiSkeleton: {
      defaultProps: {
        animation: 'wave',
      },
    },
    MuiAvatar: {
      styleOverrides: {
        colorDefault: {
          color: '#fff',
          backgroundColor: alpha(
            palette.mode === 'light'
              ? palette.neutral.main
              : palette.neutral.dark,
            0.7,
          ),
        },
      },
    },
  } satisfies Components<Omit<Theme, 'components'>>);

export { getComponentsOverrides };
