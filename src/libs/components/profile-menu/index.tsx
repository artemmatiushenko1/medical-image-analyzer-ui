import {
  DarkModeRounded,
  LanguageRounded,
  LockRounded,
  LogoutRounded,
} from '@mui/icons-material';
import {
  Avatar,
  Box,
  ListItemIcon,
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
import { Menu, MenuItem, MenuProps } from '../menu';
import { ChangePasswordDialog } from '../change-password-dialog';
import { useGetProfile } from '@/app/libs/queries';

type ProfileMenuProps = Omit<MenuProps, 'items'>;

const ProfileMenu = (props: ProfileMenuProps) => {
  const { open, anchorEl, onClose, position } = props;

  const { t } = useTranslation('App', { keyPrefix: 'ProfileMenu' });

  const { data: currentUser } = useGetProfile();

  const appLanguage = useAppStore((state) => state.language);
  const changeThemeMode = useAppStore((state) => state.changeThemeMode);
  const themeMode = useAppStore((state) => state.themeMode);
  const logout = useAuthStore((state) => state.logout);

  const {
    isOpen: isChangeLanguageDialogOpen,
    close: closeChangeLanguageDialog,
    open: openChangeLanguageDialog,
  } = useClosable(false);

  const {
    isOpen: isChangePasswordDialogOpen,
    close: closeChangePasswordDialog,
    open: openChangePasswordDialog,
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

  const handleChangePasswordClick = () => {
    openChangePasswordDialog();
  };

  const menuItems: MenuItem[] = [
    {
      justify: 'space-between',
      customRender: () => {
        return (
          <Stack
            width="100%"
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
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
          </Stack>
        );
      },
    },
    {
      name: `${t('Language')}: ${LANGUAGE_DETAILS[appLanguage].nativeVariant}`,
      icon: LanguageRounded,
      onClick: handleChangeLanguageClick,
    },
    {
      name: t('ChangePassword'),
      icon: LockRounded,
      onClick: handleChangePasswordClick,
      injectDividerAfter: true,
    },
    {
      name: t('LogOut'),
      icon: LogoutRounded,
      onClick: handleLogout,
    },
  ];

  return (
    <>
      <Menu
        anchorEl={anchorEl}
        onClose={onClose}
        open={open}
        items={menuItems}
        position={position}
        header={
          <Stack
            gap={1}
            direction="row"
            alignItems="center"
            sx={{ padding: '9px 10px' }}
          >
            <Avatar sx={{ height: '35px', width: '35px' }} alt="User avatar" />
            <Stack>
              <Typography variant="body2" fontWeight={500}>
                {currentUser?.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {currentUser?.email}
              </Typography>
            </Stack>
          </Stack>
        }
      />
      <ChangeLanguageDialog
        open={isChangeLanguageDialogOpen}
        onClose={closeChangeLanguageDialog}
      />
      <ChangePasswordDialog
        open={isChangePasswordDialogOpen}
        onClose={closeChangePasswordDialog}
      />
    </>
  );
};

export { ProfileMenu };
