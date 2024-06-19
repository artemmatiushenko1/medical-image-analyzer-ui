import createPalette from '@mui/material/styles/createPalette';
import {
  amber,
  brandBlue,
  chicago,
  cinnabar,
  emerald,
  heather,
  sky,
} from './colors';
import { alpha } from '@mui/material';

declare module '@mui/material/styles' {
  interface Palette {
    neutral: Palette['primary'];
  }

  interface PaletteOptions {
    neutral?: PaletteOptions['primary'];
  }
}

const paletteCommon = {
  primary: {
    light: brandBlue[600],
    main: brandBlue[700],
    dark: brandBlue[800],
  },
  secondary: {
    main: '#FF5858',
  },
  error: cinnabar,
  warning: amber,
  info: brandBlue,
  success: {
    contrastText: '#fff',
    light: emerald[100],
    main: emerald[500],
    dark: emerald[600],
  },
};

const paletteLight = createPalette({
  mode: 'light',
  ...paletteCommon,
  background: {
    default: '#fcfcff',
  },
  neutral: {
    light: heather[200],
    main: heather[400],
    dark: heather[700],
  },
  text: {
    disabled: chicago[200],
    secondary: '#afb3bb',
  },
  divider: alpha(heather[200], 1),
});

const paletteDark = createPalette({
  mode: 'dark',
  ...paletteCommon,
  background: {
    default: '#151824',
    paper: '#1d1f2c',
  },
  neutral: {
    light: heather[50],
    main: heather[300],
    dark: heather[500],
  },
  text: {
    disabled: chicago[400],
    secondary: '#afb3bb',
  },
  divider: alpha(heather[50], 0.1),
});

export { paletteLight, paletteDark };
