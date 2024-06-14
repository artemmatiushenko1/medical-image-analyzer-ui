import { useAppStore } from '@/app';
import { ThemeMode } from '@/libs/theme';
import {
  PopoverOrigin,
  Menu as MuiMenu,
  MenuItem,
  ListItemIcon,
  Typography,
  SvgIconProps,
  Divider,
} from '@mui/material';
import { CSSProperties } from 'react';

export type MenuItem = {
  icon?: React.FC<SvgIconProps>;
  name?: string;
  onClick?: () => void;
  customRender?: () => React.ReactNode;
  justify?: CSSProperties['justifyContent'];
  injectDividerAfter?: boolean;
};

export type MenuProps = {
  items: MenuItem[];
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
  transformOrigin?: PopoverOrigin;
  anchorOrigin?: PopoverOrigin;
  header?: React.ReactNode;
};

const Menu = (props: MenuProps) => {
  const {
    open,
    onClose,
    anchorEl,
    anchorOrigin,
    transformOrigin,
    items = [],
    header,
  } = props;

  const themeMode = useAppStore((state) => state.themeMode);

  const getMenuItemContent = (item: MenuItem) => {
    const Icon = item.icon;

    if (item.customRender) {
      return item.customRender();
    }

    return (
      <>
        <ListItemIcon>{Icon && <Icon fontSize="small" />}</ListItemIcon>
        <Typography variant="body2">{item.name}</Typography>
      </>
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
          },
          variant: themeMode === ThemeMode.DARK ? 'elevation' : 'outlined',
        },
      }}
    >
      {header}
      {items.map((item) => {
        const { justify, onClick, name, injectDividerAfter } = item;

        return (
          <>
            <MenuItem
              key={name}
              sx={{ justifyContent: justify }}
              onClick={onClick}
            >
              {getMenuItemContent(item)}
            </MenuItem>
            {injectDividerAfter && <Divider flexItem />}
          </>
        );
      })}
    </MuiMenu>
  );
};

export { Menu, type MenuItem };
