import createPalette from '@mui/material/styles/createPalette';
import { brandBlue } from './colors';

const palette = createPalette({
  primary: {
    light: brandBlue[600],
    main: brandBlue[700],
    dark: brandBlue[800],
  },
});

export { palette };
