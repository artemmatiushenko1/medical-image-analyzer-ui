import { Theme } from '@mui/material';
import { SystemStyleObject } from '@mui/system';

export const createStyleSheet = <T extends string>(
  rules: Record<T, SystemStyleObject<Theme>>,
) => rules;
