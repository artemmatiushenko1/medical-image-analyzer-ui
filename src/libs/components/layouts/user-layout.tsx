import { Box, Stack } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Header } from '../header';

const UserLayout = () => {
  return (
    <Stack sx={{ height: '100vh', width: '100%' }} direction="row">
      <Stack sx={{ flex: 1, overflow: 'hidden' }}>
        <Box sx={{ height: '60px', flexShrink: 0 }}>
          <Header />
        </Box>
        <Box
          sx={{
            flex: '1',
            overflowY: 'auto',
            background: ({ palette }) => palette.background.default,
            position: 'relative',
          }}
        >
          <Outlet />
        </Box>
      </Stack>
    </Stack>
  );
};

export { UserLayout };
