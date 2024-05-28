import { KeyboardTabRounded } from '@mui/icons-material';
import { Box, Drawer, IconButton, Stack, Typography } from '@mui/material';
import { InviteUserForm } from '../invite-user-form';
import { styles } from './styles';

type AddUserDrawerProps = {
  open: boolean;
  onClose: () => void;
};

const AddUserDrawer = (props: AddUserDrawerProps) => {
  const { open, onClose } = props;

  return (
    <Drawer
      variant="persistent"
      open={open}
      anchor="right"
      PaperProps={{ sx: styles.addUserDrawerPaper }}
      sx={styles.root}
    >
      <Stack
        direction="row"
        alignItems="flex-start"
        justifyContent="space-between"
        mb={3}
      >
        <Box sx={{ maxWidth: '70%' }}>
          <Typography variant="h6" fontWeight={600}>
            Add a new user
          </Typography>
          <Typography variant="caption">
            Please fill out the form below to add a new user to the system.
          </Typography>
        </Box>
        <IconButton
          onClick={onClose}
          sx={{
            color: ({ palette }) => palette.neutral.dark,
          }}
        >
          <KeyboardTabRounded />
        </IconButton>
      </Stack>
      <Box sx={{ flex: 1, height: 0 }}>
        <InviteUserForm />
      </Box>
    </Drawer>
  );
};

export { AddUserDrawer };
