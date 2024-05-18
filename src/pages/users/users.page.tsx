import { Box, Stack, Typography } from '@mui/material';
import { InviteUserForm } from './libs/components';
import { styles } from './styles';

const Users = () => {
  return (
    <Stack alignItems="center" justifyContent="center" sx={styles.root}>
      <Stack sx={styles.contentWrapper}>
        <Box>
          <Typography variant="h6" fontWeight={600}>
            Add a new user
          </Typography>
          <Typography variant="caption">
            Please fill out the form below to add a new user to the system.
            Enter the user's first name, last name, and email address. Ensure
            all information is accurate before submitting.
          </Typography>
        </Box>
        <InviteUserForm />
      </Stack>
    </Stack>
  );
};

export { Users };
