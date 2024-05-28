import { Box, Button, Stack, Typography } from '@mui/material';
import {
  UsersTable,
  TotalUsersWidget,
  ADD_USER_DRAWER_WIDTH_PX,
  AddUserDrawer,
} from './libs/components';
import { styles } from './styles';
import { AddRounded } from '@mui/icons-material';
import { useState } from 'react';
import { GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { Role, User } from '@/packages/users';
import { Breadcrumbs } from '@/libs/components';

const rows: GridRowsProp<User> = [
  {
    id: '1',
    firstName: 'Artem',
    lastName: 'Matiushenko',
    email: 'artem.matiushenko@gmail.com',
    role: Role.USER,
  },
  {
    id: '2',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@gmail.com',
    role: Role.USER,
  },
  {
    id: '3',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@gmail.com',
    role: Role.USER,
  },
  {
    id: '4',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@gmail.com',
    role: Role.USER,
  },
  {
    id: '5',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@gmail.com',
    role: Role.USER,
  },
];

const columns: GridColDef<User>[] = [
  {
    field: 'firstName',
    headerName: 'First Name',
    sortable: false,
    resizable: false,
    flex: 1,
  },
  {
    field: 'lastName',
    headerName: 'Last Name',
    sortable: false,
    resizable: false,
    flex: 1,
  },
  {
    field: 'email',
    headerName: 'Email',
    sortable: false,
    resizable: false,
    flex: 1,
  },
];

const Users = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const breadcrumbs = ['Home', 'Users'];

  const handleHandleAddUserClick = () => {
    setDrawerOpen((prev) => !prev);
  };

  const loading = false;

  const handleAddUserDraweClose = () => {
    setDrawerOpen(false);
  };

  return (
    <>
      <Stack sx={styles.root} direction="row">
        <Stack
          sx={{
            ...styles.contentWrapper,
            marginRight: drawerOpen ? 0 : `-${ADD_USER_DRAWER_WIDTH_PX}px`,
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
                onClick={handleHandleAddUserClick}
              >
                Add new user
              </Button>
            </Box>
          </Stack>
          <TotalUsersWidget loading={loading} count={123} />
          <UsersTable loading={loading} columns={columns} rows={rows} />
        </Stack>
        <AddUserDrawer open={drawerOpen} onClose={handleAddUserDraweClose} />
      </Stack>
    </>
  );
};

export { Users };
