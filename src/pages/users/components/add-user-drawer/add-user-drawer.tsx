import { NavigateNextRounded } from '@mui/icons-material';
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { InviteUserForm } from '../invite-user-form';
import { styles } from './styles';
import { Dialog } from '@/libs/components';
import { useTranslation } from 'react-i18next';

type AddUserDrawerProps = {
  open: boolean;
  onClose: () => void;
};

const AddUserDrawer = (props: AddUserDrawerProps) => {
  const { open, onClose } = props;

  const { t } = useTranslation('Users');

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
        alignItems="center"
        justifyContent="space-between"
        sx={{ padding: '16px 24px' }}
      >
        <Box sx={{ maxWidth: '70%' }}>
          <Typography variant="h6" fontWeight={600}>
            {t('AddNewUserDrawer.Title')}
          </Typography>
          <Typography variant="caption">
            {t('AddNewUserDrawer.Caption')}
          </Typography>
        </Box>
        <IconButton
          onClick={onClose}
          sx={{
            color: ({ palette }) => palette.neutral.dark,
          }}
        >
          <NavigateNextRounded />
        </IconButton>
      </Stack>
      <Divider />
      <Dialog.Content sx={{ flex: 1, height: 0 }}>
        <InviteUserForm />
      </Dialog.Content>
    </Drawer>
  );
};

export { AddUserDrawer };
