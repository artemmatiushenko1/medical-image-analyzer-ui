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
import { useState } from 'react';
import DashboardIcon from '@mui/icons-material/GridViewRounded';
import DescriptionIcon from '@mui/icons-material/DescriptionRounded';
import { styles } from './styles';
import { Logo } from '../logo';

const Sidebar = () => {
  const [selectedIndex, setSelectedIndex] = useState('');

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    key: string,
  ) => {
    setSelectedIndex(key);
  };

  const navItems = [
    { key: 'overview', icon: DashboardIcon, title: 'Overview' },
    { key: 'reports', icon: DescriptionIcon, title: 'Reports' },
  ];

  return (
    <Stack sx={styles.wrapper}>
      <Logo />
      <Divider />
      <List component="nav">
        <ListSubheader sx={styles.navItemSubHeader}>Main</ListSubheader>
        {navItems.map(({ key, icon: Icon, title }) => {
          const selected = selectedIndex === key;
          const color = ({ palette }: Theme) =>
            selected ? palette.primary.main : palette.neutral.main;

          return (
            <ListItemButton
              disableRipple
              selected={selected}
              sx={[styles.navItem, selected && styles.navItemSelected]}
              onClick={(event) => handleListItemClick(event, key)}
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
