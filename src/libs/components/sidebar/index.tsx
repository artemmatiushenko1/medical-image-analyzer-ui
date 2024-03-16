import {
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Stack,
  Theme,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import DashboardIcon from '@mui/icons-material/GridViewRounded';
import DescriptionIcon from '@mui/icons-material/DescriptionRounded';
import DocumentScannerRoundedIcon from '@mui/icons-material/DocumentScannerRounded';

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
    <Stack
      sx={{
        height: '100%',
        boxShadow: ({ shadows }) => shadows[2],
        borderRight: ({ palette }) => `1px solid ${palette.neutral.light}`,
      }}
    >
      <Stack direction="row" gap={1} sx={{ padding: '17.5px 25px' }}>
        <DocumentScannerRoundedIcon color="error" />
        <Typography>MediScan</Typography>
      </Stack>
      <Divider />
      <Box>
        <List component="nav">
          <ListSubheader sx={{ lineHeight: '38px' }}>Main</ListSubheader>
          {navItems.map(({ key, icon: Icon, title }) => {
            const selected = selectedIndex === key;
            const color = ({ palette }: Theme) =>
              selected ? palette.primary.main : palette.neutral.main;

            return (
              <ListItemButton
                disableRipple
                selected={selected}
                sx={{
                  padding: '8px 25px',
                  borderRight: selected
                    ? ({ palette }) => `3px solid ${palette.primary.main}`
                    : null,
                }}
                onClick={(event) => handleListItemClick(event, key)}
              >
                <ListItemIcon sx={{ minWidth: '40px' }}>
                  <Icon sx={{ fill: color }} />
                </ListItemIcon>
                <ListItemText
                  primary={title}
                  primaryTypographyProps={{
                    variant: 'body2',
                    fontWeight: 500,
                    color,
                  }}
                />
              </ListItemButton>
            );
          })}
        </List>
      </Box>
    </Stack>
  );
};

export { Sidebar };
