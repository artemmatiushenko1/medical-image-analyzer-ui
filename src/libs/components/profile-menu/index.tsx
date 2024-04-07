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

type ProfileMenuProps = {
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
};

const ProfileMenu = (props: ProfileMenuProps) => {
  const { open, anchorEl, onClose } = props;

  return (
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
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
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
          <Typography variant="body2">Dark theme</Typography>
        </Box>
        <Switch size="small" />
      </MenuItem>
      <MenuItem onClick={onClose}>
        <ListItemIcon>
          <LanguageRounded fontSize="small" />
        </ListItemIcon>
        <Typography variant="body2">Language: English</Typography>
      </MenuItem>
      <Divider />
      <MenuItem onClick={onClose}>
        <ListItemIcon>
          <LogoutRounded fontSize="small" />
        </ListItemIcon>
        <Typography variant="body2">Log out</Typography>
      </MenuItem>
    </Menu>
  );
};

export { ProfileMenu };
