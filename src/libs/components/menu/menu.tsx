import { useAppStore } from '@/app';
import { ThemeMode } from '@/libs/theme';
import { ValueOf } from '@/libs/types';
import {
  Menu as MuiMenu,
  MenuItem,
  ListItemIcon,
  Typography,
  SvgIconProps,
  Divider,
  Stack,
} from '@mui/material';
import { CSSProperties } from 'react';
import { MenuPosition } from './enums';
import { getMenuPosition } from './helpers';
import { Loader } from '../loader';

export type MenuItem = {
  icon?: React.FC<SvgIconProps>;
  name?: string;
  onClick?: () => void;
  customRender?: () => React.ReactNode;
  justify?: CSSProperties['justifyContent'];
  injectDividerAfter?: boolean;
  loading?: boolean;
};

export type MenuProps = {
  items: MenuItem[];
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
  header?: React.ReactNode;
  position?: ValueOf<typeof MenuPosition>;
};

const Menu = (props: MenuProps) => {
  const {
    open,
    onClose,
    anchorEl,
    items = [],
    header,
    position = MenuPosition.BOTTOM_RIGHT,
  } = props;

  const { transformOrigin, anchorOrigin } = getMenuPosition(position);

  const themeMode = useAppStore((state) => state.themeMode);

  const getMenuItemContent = (item: MenuItem) => {
    const Icon = item.icon;

    if (item.customRender) {
      return item.customRender();
    }

    return (
      <Stack direction="row" sx={{ justifyContent: item.justify }}>
        <ListItemIcon>{Icon && <Icon fontSize="small" />}</ListItemIcon>
        <Typography variant="body2">{item.name}</Typography>
      </Stack>
    );
  };

  return (
    <MuiMenu
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      transformOrigin={transformOrigin}
      anchorOrigin={anchorOrigin}
      slotProps={{
        paper: {
          elevation: 4,
          sx: {
            mt: 1.5,
            minWidth: '240px',
          },
          variant: themeMode === ThemeMode.DARK ? 'elevation' : 'outlined',
        },
      }}
    >
      {header}
      {items.map((item, index) => {
        const { onClick, injectDividerAfter, loading } = item;

        return [
          <MenuItem
            key={index}
            onClick={onClick}
            disabled={loading}
            sx={{ width: '100%' }}
          >
            {getMenuItemContent(item)}
            {loading ? (
              <Loader sx={{ marginLeft: 'auto' }} size="18px" />
            ) : null}
          </MenuItem>,
          injectDividerAfter && <Divider flexItem />,
        ];
      })}
    </MuiMenu>
  );
};

export { Menu, type MenuItem };
