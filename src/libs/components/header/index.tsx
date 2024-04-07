import {
  AppBar,
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  ListItemButton,
  Stack,
} from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import ViewSidebarOutlinedIcon from '@mui/icons-material/ViewSidebarOutlined';
import ViewSidebarFilledIcon from '@mui/icons-material/ViewSidebar';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import { styles } from './styles';
import { useUiStore } from '@/stores/ui.store';
import { useState } from 'react';
import { ProfileMenu } from '../profile-menu';

const Header = () => {
  const [profileMenuAnchor, setprofileMenuAnchor] =
    useState<null | HTMLElement>(null);
  const profileMenuOpen = Boolean(profileMenuAnchor);

  const toggleSidebarCollapsed = useUiStore(
    (state) => state.toggleSidebarCollapsed,
  );
  const toggleNewImageDialogOpen = useUiStore(
    (state) => state.toggleNewImageDialogOpen,
  );
  const sidebarCollapsed = useUiStore((state) => state.sidebarCollapsed);

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setprofileMenuAnchor(event.currentTarget);
  };
  const handleProfileMenuClose = () => {
    setprofileMenuAnchor(null);
  };

  return (
    <AppBar
      elevation={0}
      position="static"
      color="transparent"
      sx={styles.appBar}
    >
      <Box sx={styles.innerContainer}>
        <IconButton onClick={toggleSidebarCollapsed}>
          {sidebarCollapsed ? (
            <ViewSidebarFilledIcon
              sx={[
                styles.collapseSidebarIcon,
                styles.collapseSidebarIconActive,
              ]}
            />
          ) : (
            <ViewSidebarOutlinedIcon
              sx={[
                styles.collapseSidebarIcon,
                styles.collapseSidebarIconInactive,
              ]}
            />
          )}
        </IconButton>
        <Stack direction="row" gap={2} alignItems="center">
          <Button
            startIcon={<AddOutlinedIcon />}
            variant="contained"
            onClick={() => toggleNewImageDialogOpen()}
          >
            New Image
          </Button>
          <Divider orientation="vertical" flexItem />
          <ListItemButton disableRipple onClick={handleProfileClick}>
            <Stack direction="row" gap={1} alignItems="center">
              <Avatar
                alt="Artem Matiushenko"
                src="https://avatars.githubusercontent.com/u/71723893?s=400&u=bc39da803e24ca2b1b228eb5943ab67abefe59c9&v=4"
              />
              <ExpandMoreOutlinedIcon color="primary" />
            </Stack>
          </ListItemButton>
          <ProfileMenu
            open={profileMenuOpen}
            anchorEl={profileMenuAnchor}
            onClose={handleProfileMenuClose}
          />
        </Stack>
      </Box>
    </AppBar>
  );
};

export { Header };
