import { TypographyOptions } from '@mui/material/styles/createTypography';
import { heather } from './colors';

export const typography = {
  fontFamily:
    '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
  caption: {
    color: heather[400],
  },
} satisfies TypographyOptions;
