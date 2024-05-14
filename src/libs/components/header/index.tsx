import {
  AppBar,
  Avatar,
  Box,
  Button,
  Divider,
  ListItemButton,
  Stack,
  Typography,
} from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { styles } from './styles';
import { useState } from 'react';
import { ProfileMenu } from '../profile-menu';
import { Link, useMatch, useNavigate } from 'react-router-dom';
import { AppRoute } from '@/libs/enums';
import { ExpandMoreRounded } from '@mui/icons-material';
import { Logo } from '../logo';
import { ButtonsNavigation } from '../button-navigation';
import { useAuthStore } from '@/packages/auth';

const Header = () => {
  const navigate = useNavigate();
  const newStudyPageMatch = useMatch(AppRoute.NEW_STUDY);
  const [profileMenuAnchor, setprofileMenuAnchor] =
    useState<null | HTMLElement>(null);

  const profileMenuOpen = Boolean(profileMenuAnchor);
  const isNewStudyPage = Boolean(newStudyPageMatch);

  const currentUser = useAuthStore((state) => state.user);

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setprofileMenuAnchor(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setprofileMenuAnchor(null);
  };

  const handleNewStudyClick = () => {
    navigate(AppRoute.NEW_STUDY);
  };

  return (
    <AppBar
      elevation={0}
      position="static"
      color="transparent"
      sx={styles.appBar}
    >
      <Box sx={styles.innerContainer}>
        <Box sx={styles.logoWrapper}>
          <Link to={AppRoute.HOME}>
            <Logo />
          </Link>
        </Box>
        <ButtonsNavigation />
        <Stack direction="row" gap={2} alignItems="center">
          {!isNewStudyPage && (
            <>
              <Button
                variant="contained"
                startIcon={<AddOutlinedIcon />}
                onClick={handleNewStudyClick}
              >
                New Study
              </Button>
              <Divider orientation="vertical" flexItem />
            </>
          )}
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
                alt="User avatar"
                sx={{
                  height: '35px',
                  width: '35px',
                }}
              />
              <Box sx={{ overflow: 'hidden', width: '100%' }}>
                <Typography fontSize="12px" fontWeight={500}>
                  {currentUser?.firstName} {currentUser?.lastName}
                </Typography>
                <Typography
                  width="100%"
                  textOverflow="ellipsis"
                  variant="caption"
                  display="block"
                  overflow="hidden"
                >
                  {currentUser?.email}
                </Typography>
              </Box>
              <ExpandMoreRounded color="primary" />
            </Stack>
          </ListItemButton>
          <ProfileMenu
            open={profileMenuOpen}
            anchorEl={profileMenuAnchor}
            onClose={handleProfileMenuClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          />
        </Stack>
      </Box>
    </AppBar>
  );
};

export { Header };
