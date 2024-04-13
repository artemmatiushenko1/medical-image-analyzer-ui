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
import { useTranslation } from 'react-i18next';
import { mergeSx } from '@/libs/theme';

const Sidebar = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    {
      key: 'overview',
      path: AppRoute.HOME,
      icon: DashboardIcon,
      title: t('Sidebar.Overview'),
    },
    {
      key: 'reports',
      path: AppRoute.REPORTS,
      icon: DescriptionIcon,
      title: t('Sidebar.Reports'),
    },
  ];

  return (
    <Stack sx={styles.wrapper}>
      <Logo />
      <Divider sx={{ mx: '16px' }} />
      <List component="nav">
        <ListSubheader sx={styles.navItemSubHeader}>Main</ListSubheader>
        {navItems.map(({ key, icon: Icon, title, path }) => {
          const selected = Boolean(matchPath(path, location.pathname));
          const color = ({ palette }: Theme) =>
            selected ? palette.primary.main : undefined;

          return (
            <ListItemButton
              key={key}
              disableRipple
              selected={selected}
              sx={mergeSx(styles.navItem, selected && styles.navItemSelected)}
              onClick={() => navigate(path)}
            >
              <ListItemIcon sx={styles.navItemIcon}>
                <Icon sx={{ color }} />
              </ListItemIcon>
              <ListItemText
                primary={title}
                primaryTypographyProps={{
                  color: ({ palette }) =>
                    selected ? palette.primary.main : '#777b83',
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
