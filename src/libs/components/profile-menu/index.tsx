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
  Stack,
  Switch,
  Typography,
} from '@mui/material';
import { ChangeLanguageDialog } from '../change-language-dialog';
import { useState } from 'react';
import { useAppStore } from '@/stores/app.store';
import { LANGUAGE_DETAILS } from '@/libs/i18n';
import { useTranslation } from 'react-i18next';

type ProfileMenuProps = {
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
};

const ProfileMenu = (props: ProfileMenuProps) => {
  const { open, anchorEl, onClose } = props;

  const { t } = useTranslation('App', { keyPrefix: 'ProfileMenu' });

  const appLanguage = useAppStore((state) => state.language);

  const [changeLanguageModalOpen, setChangeLanguageModalOpen] = useState(false);

  const handleChangeLanguageClick = () => {
    setChangeLanguageModalOpen(true);
    onClose();
  };

  const handleChangeLanguageDialogClose = () => {
    setChangeLanguageModalOpen(false);
  };

  return (
    <>
      <Menu
        id="account-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={onClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              mt: 1.5,
            },
          },
        }}
        transformOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        <Stack
          gap={1}
          direction="row"
          alignItems="center"
          sx={{ padding: '9px 10px' }}
        >
          <Avatar
            alt="Artem Matiushenko"
            src="https://avatars.githubusercontent.com/u/71723893?s=400&u=bc39da803e24ca2b1b228eb5943ab67abefe59c9&v=4"
          />
          <Stack>
            <Typography variant="body2" fontWeight={500}>
              Dr. Artem Matiushenko
            </Typography>
            <Typography variant="caption" color="text.secondary">
              artom.matyushenko@gmail.com
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
          <Switch size="small" />
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
        <MenuItem onClick={onClose}>
          <ListItemIcon>
            <LogoutRounded fontSize="small" />
          </ListItemIcon>
          <Typography variant="body2">{t('LogOut')}</Typography>
        </MenuItem>
      </Menu>
      <ChangeLanguageDialog
        open={changeLanguageModalOpen}
        onClose={handleChangeLanguageDialogClose}
      />
    </>
  );
};

export { ProfileMenu };
