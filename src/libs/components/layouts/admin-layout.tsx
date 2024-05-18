import { Box, Stack } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../sidebar';
import {
  ManageAccountsRounded,
  MonitorHeartRounded,
} from '@mui/icons-material';
import { AppRoute } from '@/app';

const AdminLayout = () => {
  const navItems = [
    {
      key: 'diagnostics',
      path: AppRoute.DIAGNOSTICS,
      icon: MonitorHeartRounded,
      title: 'Diagnostics',
    },
    {
      key: 'users',
      path: AppRoute.USERS,
      icon: ManageAccountsRounded,
      title: 'Users',
    },
  ];

  return (
    <Stack sx={{ height: '100vh', width: '100%' }} direction="row">
      <Box sx={{ width: '235px' }}>
        <Sidebar navItems={navItems} />
      </Box>
      <Stack sx={{ flex: 1, overflow: 'hidden' }}>
        <Box
          sx={{
            flex: '1',
            overflowY: 'auto',
            background: '#f7f9ff',
            padding: '40px',
            position: 'relative',
          }}
        >
          <Outlet />
        </Box>
      </Stack>
    </Stack>
  );
};

export { AdminLayout };
