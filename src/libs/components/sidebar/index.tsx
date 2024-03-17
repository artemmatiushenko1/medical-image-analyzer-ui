import {
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Stack,
  Theme,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/GridViewRounded';
import DescriptionIcon from '@mui/icons-material/DescriptionRounded';
import { styles } from './styles';
import { Logo } from '../logo';
import { matchPath, useLocation, useNavigate } from 'react-router-dom';
import { AppRoute } from '@/libs/enums';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    {
      key: 'overview',
      path: AppRoute.HOME,
      icon: DashboardIcon,
      title: 'Overview',
    },
    {
      key: 'reports',
      path: AppRoute.REPORTS,
      icon: DescriptionIcon,
      title: 'Reports',
    },
  ];

  return (
    <Stack sx={styles.wrapper}>
      <Logo />
      <Divider />
      <List component="nav">
        <ListSubheader sx={styles.navItemSubHeader}>Main</ListSubheader>
        {navItems.map(({ key, icon: Icon, title, path }) => {
          const selected = Boolean(matchPath(path, location.pathname));
          const color = ({ palette }: Theme) =>
            selected ? palette.primary.main : palette.neutral.main;

          return (
            <ListItemButton
              key={key}
              disableRipple
              selected={selected}
              sx={[styles.navItem, selected && styles.navItemSelected]}
              onClick={() => navigate(path)}
            >
              <ListItemIcon sx={styles.navItemIcon}>
                <Icon sx={{ fill: color }} />
              </ListItemIcon>
              <ListItemText
                primary={title}
                primaryTypographyProps={{
                  color,
                  variant: 'body2',
                  sx: styles.navItemText,
                }}
              />
            </ListItemButton>
          );
        })}
      </List>
    </Stack>
  );
};

export { Sidebar };
