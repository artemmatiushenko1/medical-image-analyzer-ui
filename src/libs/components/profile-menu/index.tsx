import {
  DarkModeRounded,
  LanguageRounded,
  LogoutRounded,
} from '@mui/icons-material';
import {
  Avatar,
  Box,
  Divider,
  ListItemIcon,
  Menu,
  MenuItem,
  PopoverOrigin,
  Stack,
  Switch,
  Typography,
} from '@mui/material';
import { ChangeLanguageDialog } from '../change-language-dialog';
import { useAppStore, useAuthStore } from '@/app';
import { useTranslation } from 'react-i18next';
import { LANGUAGE_DETAILS } from '@/i18n';
import { useClosable } from '@/libs/hooks';
import { ThemeMode } from '@/libs/theme';

type ProfileMenuProps = {
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
  transformOrigin?: PopoverOrigin;
  anchorOrigin?: PopoverOrigin;
};

const ProfileMenu = (props: ProfileMenuProps) => {
  const { open, anchorEl, onClose, transformOrigin, anchorOrigin } = props;

  const { t } = useTranslation('App', { keyPrefix: 'ProfileMenu' });

  const appLanguage = useAppStore((state) => state.language);
  const changeThemeMode = useAppStore((state) => state.changeThemeMode);
  const themeMode = useAppStore((state) => state.themeMode);
  const currentUser = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const {
    isOpen: isChangeLanguageDialogOpen,
    close: closeChangeLanguageDialog,
    open: openChangeLanguageDialog,
  } = useClosable(false);

  const handleChangeLanguageClick = () => {
    openChangeLanguageDialog();
    onClose();
  };

  const handleLogout = () => {
    logout();
  };

  const handleDarkThemeSwitchChange = (
    _: React.ChangeEvent<HTMLInputElement>,
    checked: boolean,
  ) => {
    changeThemeMode(checked ? ThemeMode.DARK : ThemeMode.LIGHT);
  };

  return (
    <>
      <Menu
        id="profile-menu"
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
        <Stack
          gap={1}
          direction="row"
          alignItems="center"
          sx={{ padding: '9px 10px' }}
        >
          <Avatar sx={{ height: '35px', width: '35px' }} alt="User avatar" />
          <Stack>
            <Typography variant="body2" fontWeight={500}>
              {currentUser?.firstName} {currentUser?.lastName}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {currentUser?.email}
            </Typography>
          </Stack>
        </Stack>
        <MenuItem sx={{ justifyContent: 'space-between' }}>
          <Box display="flex">
            <ListItemIcon>
              <DarkModeRounded fontSize="small" />
            </ListItemIcon>
            <Typography variant="body2">{t('DarkTheme')}</Typography>
          </Box>
          <Switch
            size="small"
            checked={themeMode === ThemeMode.DARK ? true : false}
            onChange={handleDarkThemeSwitchChange}
          />
        </MenuItem>
        <MenuItem onClick={handleChangeLanguageClick}>
          <ListItemIcon>
            <LanguageRounded fontSize="small" />
          </ListItemIcon>
          <Typography variant="body2">
            {t('Language')}: {LANGUAGE_DETAILS[appLanguage].nativeVariant}
          </Typography>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutRounded fontSize="small" />
          </ListItemIcon>
          <Typography variant="body2">{t('LogOut')}</Typography>
        </MenuItem>
      </Menu>
      <ChangeLanguageDialog
        open={isChangeLanguageDialogOpen}
        onClose={closeChangeLanguageDialog}
      />
    </>
  );
};

export { ProfileMenu };
