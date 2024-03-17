import { Box, Stack } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Header } from '../header';
import { Sidebar } from '../sidebar';
import { useUiStore } from '@/stores/ui.store';

const PrimaryLayout = () => {
  const sidebarCollapsed = useUiStore((state) => state.sidebarCollapsed);

  return (
    <Stack sx={{ height: '100vh', width: '100%' }} direction="row">
      {!sidebarCollapsed && (
        <Box sx={{ width: '235px' }}>
          <Sidebar />
        </Box>
      )}
      <Stack sx={{ flex: 1, overflow: 'hidden' }}>
        <Box sx={{ height: '60px', flexShrink: 0 }}>
          <Header />
        </Box>
        <Box
          sx={{
            flex: '1',
            overflowY: 'auto',
            background: '#f7f9ff',
            padding: '20px',
            position: 'relative',
          }}
        >
          <Outlet />
        </Box>
      </Stack>
    </Stack>
  );
};

export { PrimaryLayout };
