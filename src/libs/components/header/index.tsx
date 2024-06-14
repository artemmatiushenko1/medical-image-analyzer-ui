import {
  AppBar,
  Avatar,
  Box,
  Button,
  Divider,
  ListItemButton,
  Stack,
  Theme,
  Typography,
  useMediaQuery,
} from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { styles } from './styles';
import { ProfileMenu } from '../profile-menu';
import { Link, useMatch, useNavigate } from 'react-router-dom';
import { AppRoute, useAuthStore } from '@/app';
import { ExpandMoreRounded } from '@mui/icons-material';
import { Logo } from '../logo';
import { ButtonsNavigation } from '../button-navigation';
import { useTranslation } from 'react-i18next';
import { useMenuPopover } from '@/libs/hooks';

const Header = () => {
  const { t } = useTranslation('App');

  const navigate = useNavigate();

  const newStudyPageMatch = useMatch(AppRoute.NEW_STUDY);
  const {
    open: menuOpen,
    closeMenu,
    openMenu,
    anchorEl: menuAnchorEl,
  } = useMenuPopover();

  const currentUser = useAuthStore((state) => state.user);

  const isDownToMediumScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.up('md'),
  );

  const isNewStudyPage = Boolean(newStudyPageMatch);

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
            <Logo iconOnly={!isDownToMediumScreen} />
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
                {t('Header.NewStudy')}
              </Button>
              <Divider orientation="vertical" flexItem />
            </>
          )}
          <ListItemButton
            disableRipple
            onClick={openMenu}
            sx={{ flexGrow: 0, padding: '12px', margin: '-14px' }}
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
              {isDownToMediumScreen && (
                <>
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
                </>
              )}
            </Stack>
          </ListItemButton>
          <ProfileMenu
            open={menuOpen}
            anchorEl={menuAnchorEl}
            onClose={closeMenu}
          />
        </Stack>
      </Box>
    </AppBar>
  );
};

export { Header };
