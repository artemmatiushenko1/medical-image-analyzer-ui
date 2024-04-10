import { Theme, SxProps } from '@mui/material';

export const createStyleSheet = <T extends string>(
  rules: Record<T, SxProps<Theme>>,
) => rules;

export const mergeSx = (
  ...sxProps: (SxProps<Theme> | boolean)[]
): SxProps<Theme> => {
  return sxProps.filter(Boolean) as SxProps<Theme>;
};
