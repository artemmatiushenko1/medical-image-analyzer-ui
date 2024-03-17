import createPalette from '@mui/material/styles/createPalette';
import { brandBlue, chicago, cinnabar, emerald } from './colors';

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
    light: chicago[100],
    main: chicago[400],
    dark: chicago[500],
  },
  text: {
    primary: '#000000',
    secondary: '#afb3bb',
    disabled: '#afb3bb',
  },
  success: {
    light: emerald[100],
    main: emerald[600],
    dark: emerald[700],
  },
});

export { palette };
