import {
  Box,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Dialog } from '../dialog';
import { HighlightedIcon } from '../highlighted-icon';
import {
  LockRounded,
  VisibilityOffRounded,
  VisibilityRounded,
} from '@mui/icons-material';
import { useState } from 'react';
import { useChangePassword } from '@/app/libs/queries';
import { Button } from '../button';
import { showNotification } from '@/libs/helpers';

type ChangePasswordDialogProps = {
  open: boolean;
  onClose: () => void;
};

const ChangePasswordDialog = (props: ChangePasswordDialogProps) => {
  const { open, onClose } = props;

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [password, setPassword] = useState('');

  const { mutate: changePassword, isPending } = useChangePassword(() => {
    showNotification('Password was updated successfully!', 'success');
    onClose();
  });

  const handleUpdateClick = () => {
    changePassword(password);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <Dialog.Content>
        <Stack gap={2}>
          <Stack direction="row" justifyContent="space-between">
            <Stack gap={2}>
              <Stack direction="row" alignItems="center" gap={2}>
                <HighlightedIcon rounded iconElement={<LockRounded />} />
                <Dialog.Title sx={{ padding: 0 }} fontWeight={600}>
                  Change password
                </Dialog.Title>
              </Stack>
              <Typography variant="caption">
                Specify your new password
              </Typography>
            </Stack>
            <Box>
              <Dialog.Close />
            </Box>
          </Stack>
          <TextField
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            type={isPasswordVisible ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" sx={{ mr: -0.5 }}>
                  <IconButton
                    color="inherit"
                    onClick={() => setIsPasswordVisible((prev) => !prev)}
                  >
                    {isPasswordVisible ? (
                      <VisibilityOffRounded />
                    ) : (
                      <VisibilityRounded />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Dialog.Actions sx={{ padding: 0 }}>
            <Button
              variant="contained"
              onClick={handleUpdateClick}
              isLoading={isPending}
            >
              Update
            </Button>
          </Dialog.Actions>
        </Stack>
      </Dialog.Content>
    </Dialog>
  );
};

export { ChangePasswordDialog };
