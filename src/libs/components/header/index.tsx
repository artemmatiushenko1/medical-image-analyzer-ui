import {
  AppBar,
  Avatar,
  Button,
  Container,
  Divider,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import ViewSidebarOutlinedIcon from '@mui/icons-material/ViewSidebarOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';

const Header = () => {
  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <IconButton color="default">
            <ViewSidebarOutlinedIcon sx={{ transform: 'scaleX(-1)' }} />
          </IconButton>
          <Stack direction="row" gap={2}>
            <Button startIcon={<AddOutlinedIcon />} variant="contained">
              New Image
            </Button>
            <Divider orientation="vertical" flexItem />
            <Stack direction="row" gap={1} alignItems="center">
              <Avatar
                alt="Artem Matiushenko"
                src="/static/images/avatar/2.jpg"
              />
              <Stack>
                <Typography variant="body2" fontWeight={500}>
                  Dr. Artem Matiushenko
                </Typography>
                <Typography variant="caption">
                  artom.matyushenko@gmail.com
                </Typography>
              </Stack>
              <ExpandMoreOutlinedIcon color="primary" />
            </Stack>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export { Header };
