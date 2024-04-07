import {
  AppBar,
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  ListItemButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  Switch,
  Typography,
} from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import ViewSidebarOutlinedIcon from '@mui/icons-material/ViewSidebarOutlined';
import ViewSidebarFilledIcon from '@mui/icons-material/ViewSidebar';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import { styles } from './styles';
import { useUiStore } from '@/stores/ui.store';
import { useState } from 'react';
import {
  LanguageRounded,
  LogoutRounded,
  DarkModeRounded,
} from '@mui/icons-material';

const Header = () => {
  const toggleSidebarCollapsed = useUiStore(
    (state) => state.toggleSidebarCollapsed,
  );
  const toggleNewImageDialogOpen = useUiStore(
    (state) => state.toggleNewImageDialogOpen,
  );
  const sidebarCollapsed = useUiStore((state) => state.sidebarCollapsed);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
          <ListItemButton disableRipple onClick={handleClick}>
            <Stack direction="row" gap={1} alignItems="center">
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
              <ExpandMoreOutlinedIcon color="primary" />
            </Stack>
          </ListItemButton>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                mt: 1.5,
                borderRadius: 3,
                width: '220px',
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem sx={{ justifyContent: 'space-between' }}>
              <Box display="flex">
                <ListItemIcon>
                  <DarkModeRounded fontSize="small" />
                </ListItemIcon>
                <Typography variant="body2">Dark theme</Typography>
              </Box>
              <Switch size="small" />
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <LanguageRounded fontSize="small" />
              </ListItemIcon>
              <Typography variant="body2">Language</Typography>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <LogoutRounded fontSize="small" />
              </ListItemIcon>
              <Typography variant="body2">Log out</Typography>
            </MenuItem>
          </Menu>
        </Stack>
      </Box>
    </AppBar>
  );
};

export { Header };
