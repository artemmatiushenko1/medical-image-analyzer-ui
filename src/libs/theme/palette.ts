import createPalette from '@mui/material/styles/createPalette';
import { brandBlue, cinnabar, emerald, heather } from './colors';

declare module '@mui/material/styles' {
  interface Palette {
    neutral: Palette['primary'];
  }

  interface PaletteOptions {
    neutral?: PaletteOptions['primary'];
  }
}

const palette = createPalette({
  primary: {
    light: brandBlue[600],
    main: brandBlue[700],
    dark: brandBlue[800],
  },
  error: cinnabar,
  neutral: {
    light: heather[200],
    main: heather[300],
    dark: heather[500],
  },
  text: {
    primary: '#000000',
    secondary: '#afb3bb',
    disabled: '#afb3bb',
  },
  success: {
    contrastText: '#fff',
    light: emerald[100],
    main: emerald[500],
    dark: emerald[600],
  },
});

export { palette };
