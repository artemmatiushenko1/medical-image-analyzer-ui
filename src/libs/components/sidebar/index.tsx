import {
  Avatar,
  Box,
  Button,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Stack,
  Theme,
  Typography,
} from '@mui/material';
import { GridViewRounded, DescriptionRounded } from '@mui/icons-material';
import { styles } from './styles';
import { Logo } from '../logo';
import { matchPath, useLocation, useNavigate } from 'react-router-dom';
import { AppRoute } from '@/app';
import { useTranslation } from 'react-i18next';
import { mergeSx } from '@/libs/theme';
import { ProfileMenu } from '../profile-menu';
import { AddRounded, ExpandMoreRounded } from '@mui/icons-material';
import { useState } from 'react';

const Sidebar = () => {
  const { t } = useTranslation('App');
  const location = useLocation();
  const navigate = useNavigate();

  const [profileMenuAnchor, setprofileMenuAnchor] =
    useState<null | HTMLElement>(null);

  const profileMenuOpen = Boolean(profileMenuAnchor);

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setprofileMenuAnchor(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setprofileMenuAnchor(null);
  };

  const handleNewStudyClick = () => {
    navigate(AppRoute.NEW_STUDY);
  };

  const navItems = [
    {
      key: 'overview',
      path: AppRoute.HOME,
      icon: GridViewRounded,
      title: t('Sidebar.Overview'),
    },
    {
      key: 'studies',
      path: AppRoute.STUDIES,
      icon: DescriptionRounded,
      title: t('Sidebar.Studies'),
    },
  ];

  return (
    <Stack sx={styles.wrapper}>
      <Box sx={styles.logoWrapper}>
        <Logo />
      </Box>
      <Divider sx={styles.divider} />
      <Stack sx={{ justifyContent: 'space-between', flex: 1, padding: '14px' }}>
        <List component="nav" sx={{ margin: '-14px' }}>
          <ListSubheader sx={styles.navItemSubHeader}>
            {t('Sidebar.Main')}
          </ListSubheader>
          {navItems.map(({ key, icon: Icon, title, path }) => {
            const selected = Boolean(matchPath(path, location.pathname));
            const color = ({ palette }: Theme) =>
              selected ? palette.primary.main : undefined;

            return (
              <ListItemButton
                key={key}
                disableRipple
                selected={selected}
                sx={mergeSx(styles.navItem, selected && styles.navItemSelected)}
                onClick={() => navigate(path)}
              >
                <ListItemIcon sx={styles.navItemIcon}>
                  <Icon sx={{ color }} />
                </ListItemIcon>
                <ListItemText
                  primary={title}
                  primaryTypographyProps={{
                    color: ({ palette }) =>
                      selected ? palette.primary.main : '#777b83',
                    variant: 'body2',
                    sx: styles.navItemText,
                  }}
                />
              </ListItemButton>
            );
          })}
        </List>
        <Stack gap={2}>
          <Button
            variant="contained"
            startIcon={<AddRounded />}
            onClick={handleNewStudyClick}
          >
            {t('Sidebar.NewStudy')}
          </Button>
          <Divider orientation="horizontal" />
          <ListItemButton
            sx={{ flexGrow: 0, padding: '12px', margin: '-14px' }}
            disableRipple
            onClick={handleProfileClick}
          >
            <Stack
              direction="row"
              gap={1}
              alignItems="center"
              sx={{ width: '100%' }}
            >
              <Avatar
                sx={{ height: '35px', width: '35px' }}
                alt="User avatar"
              />
              <Box sx={{ overflow: 'hidden', width: '100%' }}>
                <Typography fontSize="12px" fontWeight={500}>
                  Artem Matiushenko
                </Typography>
                <Typography
                  width="100%"
                  textOverflow="ellipsis"
                  variant="caption"
                  display="block"
                  overflow="hidden"
                >
                  artom.matyushenko@gmail.com
                </Typography>
              </Box>
              <ExpandMoreRounded color="primary" />
            </Stack>
          </ListItemButton>
          <ProfileMenu
            open={profileMenuOpen}
            anchorEl={profileMenuAnchor}
            onClose={handleProfileMenuClose}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};

export { Sidebar };
