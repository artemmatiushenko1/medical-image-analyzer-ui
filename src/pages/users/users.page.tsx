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
import { useTranslation } from 'react-i18next';

const Users = () => {
  const { t } = useTranslation('Users');

  const { isLoading, data: users = [] } = useGetAllUsers();

  const {
    isOpen: isDrawerOpen,
    close: closeDrawer,
    open: openDrawer,
  } = useClosable();

  const breadcrumbs = [t('Breadcrumbs.Home'), t('Breadcrumbs.Users')];

  return (
    <Stack sx={styles.root} direction="row">
      <Stack
        sx={{
          ...styles.contentWrapper,
        }}
      >
        <Breadcrumbs segments={breadcrumbs} />
        <Stack direction="row" justifyContent="space-between">
          <Box sx={{ flex: 0.6 }}>
            <Typography variant="h6" fontWeight={600}>
              {t('PageTitle')}
            </Typography>
            <Typography variant="caption">{t('PageDescription')}</Typography>
          </Box>
          {!isDrawerOpen && (
            <Box>
              <Button
                startIcon={<AddRounded />}
                variant="contained"
                onClick={openDrawer}
              >
                {t('AddNewUserButton')}
              </Button>
            </Box>
          )}
        </Stack>
        <TotalUsersWidget loading={isLoading} count={users.length} />
        <UsersTable loading={isLoading} rows={users} />
      </Stack>
      <AddUserDrawer open={isDrawerOpen} onClose={closeDrawer} />
    </Stack>
  );
};

export { Users };
