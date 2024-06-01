import { Box, Button, Stack, Typography } from '@mui/material';
import {
  UsersTable,
  TotalUsersWidget,
  ADD_USER_DRAWER_WIDTH_PX,
  AddUserDrawer,
} from './components';
import { styles } from './styles';
import { AddRounded } from '@mui/icons-material';
import { useGetAllUsers } from '@/packages/users';
import { Breadcrumbs } from '@/libs/components';
import { useClosable } from '@/libs/hooks';

const Users = () => {
  const { isLoading, data: users = [] } = useGetAllUsers();

  const {
    isOpen: isDrawerOpen,
    close: closeDrawer,
    open: openDrawer,
  } = useClosable();

  const breadcrumbs = ['Home', 'Users'];

  return (
    <Stack sx={styles.root} direction="row">
      <Stack
        sx={{
          ...styles.contentWrapper,
          marginRight: isDrawerOpen ? 0 : `-${ADD_USER_DRAWER_WIDTH_PX}px`,
        }}
      >
        <Breadcrumbs segments={breadcrumbs} />
        <Stack direction="row" justifyContent="space-between">
          <Box sx={{ flex: 0.6 }}>
            <Typography variant="h6" fontWeight={600}>
              Users management
            </Typography>
            <Typography variant="caption">
              View the list of users and add new ones.
            </Typography>
          </Box>
          <Box>
            <Button
              startIcon={<AddRounded />}
              variant="contained"
              onClick={openDrawer}
            >
              Add new user
            </Button>
          </Box>
        </Stack>
        <TotalUsersWidget loading={isLoading} count={users.length} />
        <UsersTable loading={isLoading} rows={users} />
      </Stack>
      <AddUserDrawer open={isDrawerOpen} onClose={closeDrawer} />
    </Stack>
  );
};

export { Users };
