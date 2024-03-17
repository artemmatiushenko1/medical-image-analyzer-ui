import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  IconButton,
  ListItemButton,
  Stack,
  Typography,
} from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import ViewSidebarOutlinedIcon from '@mui/icons-material/ViewSidebarOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsRounded';
import { styles } from './styles';

const Header = () => {
  return (
    <AppBar
      elevation={0}
      position="static"
      color="transparent"
      sx={styles.appBar}
    >
      <Box sx={styles.innerContainer}>
        <IconButton>
          <ViewSidebarOutlinedIcon sx={styles.collapseSidebarIcon} />
        </IconButton>
        <Stack direction="row" gap={2} alignItems="center">
          <Button startIcon={<AddOutlinedIcon />} variant="contained">
            New Image
          </Button>
          <Divider orientation="vertical" flexItem />
          <IconButton>
            <Badge badgeContent={4} color="error">
              <NotificationsOutlinedIcon sx={styles.notificationIcon} />
            </Badge>
          </IconButton>
          <ListItemButton disableRipple>
            <Stack direction="row" gap={1} alignItems="center">
              <Avatar
                alt="Artem Matiushenko"
                src="/static/images/avatar/2.jpg"
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
        </Stack>
      </Box>
    </AppBar>
  );
};

export { Header };
