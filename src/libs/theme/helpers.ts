import { Theme, SxProps } from '@mui/material';

export const createStyleSheet = <T extends string>(
  rules: Record<T, SxProps<Theme>>,
) => rules;
