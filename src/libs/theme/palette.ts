import createPalette from '@mui/material/styles/createPalette';
import { amber, brandBlue, cinnabar, emerald, heather, sky } from './colors';
import { alpha } from '@mui/material';

declare module '@mui/material/styles' {
  interface Palette {
    neutral: Palette['primary'];
  }

  interface PaletteOptions {
    neutral?: PaletteOptions['primary'];
  }
}

const paletteLight = createPalette({
  mode: 'light',
  background: {
    default: '#fcfcff',
  },
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
  info: sky,
  neutral: {
    light: heather[200],
    main: heather[300],
    dark: heather[500],
  },
  text: {
    secondary: '#afb3bb',
  },
  success: {
    contrastText: '#fff',
    light: emerald[100],
    main: emerald[500],
    dark: emerald[600],
  },
  divider: alpha(heather[200], 1),
});

const paletteDark = createPalette({
  mode: 'dark',
  background: {
    default: '#151824',
    paper: '#2a2c38',
  },
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
  info: sky,
  neutral: {
    light: heather[50],
    main: heather[300],
    dark: heather[500],
  },
  text: {
    secondary: '#afb3bb',
  },
  success: {
    contrastText: '#fff',
    light: emerald[100],
    main: emerald[500],
    dark: emerald[600],
  },
  divider: alpha(heather[50], 0.1),
});

export { paletteLight, paletteDark };
