import createPalette from '@mui/material/styles/createPalette';
import { brandBlue, chicago, cinnabar } from './colors';

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
    secondary: chicago[300],
    primary: chicago[600],
  },
});

export { palette };
