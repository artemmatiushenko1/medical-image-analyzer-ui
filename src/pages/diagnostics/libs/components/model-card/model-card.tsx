import { HistoryRounded, MoreVertRounded } from '@mui/icons-material';
import {
  Card,
  CardContent,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  Switch,
  Typography,
} from '@mui/material';
import { styles } from './styles';
import { useMenuPopover } from '@/libs/hooks';

type ModelCardProps = {
  name: string;
  version: string;
};

const ModelCard = (props: ModelCardProps) => {
  const { name, version } = props;

  const { open, openMenu, closeMenu, anchorEl } =
    useMenuPopover<HTMLButtonElement>();

  return (
    <Card sx={styles.root}>
      <CardContent sx={styles.content}>
        <Stack flex={1}>
          <Typography component="div" fontWeight={500} fontSize={16} noWrap>
            {name}
          </Typography>
          <Typography variant="caption">Name</Typography>
        </Stack>
        <Stack flex={0.33}>
          <Typography component="div" fontWeight={500} fontSize={16}>
            v{version}.0.0
          </Typography>
          <Typography variant="caption">Version</Typography>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={2} flex={0.33}>
          <Stack spacing={0.5}>
            <Switch color="success" size="small" />
            <Typography variant="caption">Enabled</Typography>
          </Stack>
          <IconButton
            onClick={openMenu}
            sx={{ color: ({ palette }) => palette.neutral.dark }}
          >
            <MoreVertRounded />
          </IconButton>
          <Menu
            open={open}
            anchorEl={anchorEl}
            onClose={closeMenu}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem>
              <ListItemIcon>
                <HistoryRounded fontSize="small" />
              </ListItemIcon>
              <Typography variant="body2">View versions</Typography>
            </MenuItem>
          </Menu>
        </Stack>
      </CardContent>
    </Card>
  );
};

export { ModelCard };
