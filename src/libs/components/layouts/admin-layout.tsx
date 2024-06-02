import { Box, Stack } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../sidebar';
import {
  ManageAccountsRounded,
  MonitorHeartRounded,
} from '@mui/icons-material';
import { AppRoute } from '@/app';
import { useTranslation } from 'react-i18next';

const AdminLayout = () => {
  const { t } = useTranslation('App');

  const navItems = [
    {
      key: 'diagnostics',
      path: AppRoute.DIAGNOSTICS,
      icon: MonitorHeartRounded,
      title: t('Navigation.Diagnostics'),
    },
    {
      key: 'users',
      path: AppRoute.USERS,
      icon: ManageAccountsRounded,
      title: t('Navigation.Users'),
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
            background: ({ palette }) => palette.background.default,
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
