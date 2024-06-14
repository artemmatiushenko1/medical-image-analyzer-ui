import { ValueOf } from '@/libs/types';
import { MenuPosition } from './enums';
import { PopoverOrigin } from '@mui/material';

const getMenuPosition = (position: ValueOf<typeof MenuPosition>) => {
  let transformOrigin: PopoverOrigin = {
    horizontal: 'center',
    vertical: 'center',
  };
  let anchorOrigin: PopoverOrigin = {
    horizontal: 'center',
    vertical: 'center',
  };

  switch (position) {
    case MenuPosition.RIGHT:
      transformOrigin = { horizontal: 'left', vertical: 'top' };
      anchorOrigin = { horizontal: 'right', vertical: 'top' };
      break;
    case MenuPosition.BOTTOM:
      transformOrigin = { horizontal: 'center', vertical: 'top' };
      anchorOrigin = { horizontal: 'center', vertical: 'bottom' };
      break;
    case MenuPosition.BOTTOM_LEFT:
      transformOrigin = { horizontal: 'right', vertical: 'top' };
      anchorOrigin = { horizontal: 'left', vertical: 'bottom' };
      break;
    case MenuPosition.BOTTOM_RIGHT:
      transformOrigin = { horizontal: 'left', vertical: 'top' };
      anchorOrigin = { horizontal: 'right', vertical: 'bottom' };
      break;
    case MenuPosition.TOP_RIGHT:
      transformOrigin = { horizontal: 'left', vertical: 'bottom' };
      anchorOrigin = { horizontal: 'right', vertical: 'top' };
      break;
    case MenuPosition.TOP_LEFT:
      transformOrigin = { horizontal: 'right', vertical: 'bottom' };
      anchorOrigin = { horizontal: 'left', vertical: 'top' };
      break;
    case MenuPosition.LEFT:
      transformOrigin = { horizontal: 'right', vertical: 'top' };
      anchorOrigin = { horizontal: 'left', vertical: 'top' };
      break;
    case MenuPosition.CENTER:
      transformOrigin = { horizontal: 'center', vertical: 'center' };
      anchorOrigin = { horizontal: 'center', vertical: 'center' };
      break;
  }

  return { transformOrigin, anchorOrigin };
};

export { getMenuPosition };
