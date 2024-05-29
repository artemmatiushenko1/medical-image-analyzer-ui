import { MouseEventHandler, useState } from 'react';

const useMenuPopover = <T = HTMLElement>() => {
  const [anchorEl, setAnchorEl] = useState<T | null>(null);

  const openMenu: MouseEventHandler<T> = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  return {
    open: !!anchorEl,
    closeMenu,
    openMenu,
    anchorEl,
  };
};

export { useMenuPopover };
