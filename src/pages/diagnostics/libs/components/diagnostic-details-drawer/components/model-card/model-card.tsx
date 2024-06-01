import { ManageHistoryRounded, MoreVertRounded } from '@mui/icons-material';
import {
  Card,
  CardContent,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Skeleton,
  Stack,
  Switch,
  Typography,
} from '@mui/material';
import { styles } from './styles';
import { useMenuPopover } from '@/libs/hooks';
import { formatVersionString } from '@/pages/diagnostics/libs/helpers';

type ModelCardProps = {
  name: string;
  version: number;
  enabled: boolean;

  onViewDetails: () => void;
};

const ModelCard = (props: ModelCardProps) => {
  const { name, version, enabled, onViewDetails } = props;

  const { open, openMenu, closeMenu, anchorEl } =
    useMenuPopover<HTMLButtonElement>();

  return (
    <Card sx={styles.root}>
      <CardContent sx={styles.content}>
        <Stack flex={1}>
          <Typography
            component="div"
            fontWeight={500}
            fontSize={16}
            noWrap
            maxWidth={200}
          >
            {name}
          </Typography>
          <Typography variant="caption">Name</Typography>
        </Stack>
        <Stack flex={0.33}>
          <Typography component="div" fontWeight={500} fontSize={16}>
            {formatVersionString(version)}
          </Typography>
          <Typography variant="caption">Version</Typography>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={2} flex={0.33}>
          <Stack spacing={0.5}>
            <Switch color="success" size="small" checked={enabled} />
            <Typography variant="caption">Enabled</Typography>
          </Stack>
          <IconButton
            onClick={openMenu}
            sx={{ color: ({ palette }) => palette.neutral.dark }}
          >
            <MoreVertRounded />
          </IconButton>
        </Stack>
        <Menu
          open={open}
          anchorEl={anchorEl}
          onClose={closeMenu}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem onClick={onViewDetails}>
            <ListItemIcon>
              <ManageHistoryRounded fontSize="small" />
            </ListItemIcon>
            <Typography variant="body2">View details</Typography>
          </MenuItem>
        </Menu>
      </CardContent>
    </Card>
  );
};

ModelCard.Skeleton = () => {
  const spacing = 0.35;

  return (
    <Card sx={styles.root}>
      <CardContent sx={{ ...styles.content, gap: 2 }}>
        <Stack flex={1} spacing={spacing}>
          <Typography component="div" fontWeight={500} fontSize={16}>
            <Skeleton />
          </Typography>
          <Typography component="div" variant="caption">
            <Skeleton />
          </Typography>
        </Stack>
        <Stack flex={0.33} spacing={spacing}>
          <Typography component="div" fontWeight={500} fontSize={16}>
            <Skeleton />
          </Typography>
          <Typography component="div" variant="caption">
            <Skeleton />
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={2} flex={0.33}>
          <Stack spacing={spacing}>
            <Skeleton component="div" variant="rounded">
              <Switch size="small" />
            </Skeleton>
            <Typography component="div" variant="caption">
              <Skeleton />
            </Typography>
          </Stack>
          <Skeleton component="div" variant="circular">
            <IconButton>
              <MoreVertRounded />
            </IconButton>
          </Skeleton>
        </Stack>
      </CardContent>
    </Card>
  );
};

export { ModelCard };
