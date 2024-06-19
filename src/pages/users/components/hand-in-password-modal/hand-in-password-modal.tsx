import { useAppStore } from '@/app';
import { Dialog, HighlightedIcon } from '@/libs/components';
import { CopyIcon } from '@/libs/components/icons';
import { useClipboard } from '@/libs/hooks';
import { ThemeMode } from '@/libs/theme';
import { User } from '@/packages/users';
import { LockRounded } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Paper,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

type HandInPasswordModalProps = {
  open: boolean;
  user: User;
  password: string;

  onClose: () => void;
};

const HandInPasswordModal = (props: HandInPasswordModalProps) => {
  const { open, onClose, password, user } = props;

  const themeMode = useAppStore((state) => state.themeMode);

  const { t } = useTranslation('Users');

  const { t: tСommon } = useTranslation('Common');

  const { copy } = useClipboard();

  const handleCopyPassword = () => {
    copy(password, t('HandInPassword.PasswordWasCopiedToClipboard'));
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <Dialog.Content>
        <Stack gap={2}>
          <Stack direction="row" justifyContent="end">
            <Stack gap={2}>
              <Stack direction="row" alignItems="center" gap={2}>
                <HighlightedIcon rounded iconElement={<LockRounded />} />
                <Dialog.Title sx={{ padding: 0 }} fontWeight={600}>
                  {t('HandInPassword.Title')}
                </Dialog.Title>
              </Stack>
              <Typography variant="caption">
                {t('HandInPassword.Description')}
              </Typography>
            </Stack>
            <Box>
              <Dialog.Close />
            </Box>
          </Stack>
          <Stack>
            <Typography variant="subtitle2" gutterBottom>
              {t('User')}
            </Typography>
            <Paper
              sx={{ p: 1 }}
              elevation={1}
              variant={themeMode === ThemeMode.DARK ? 'elevation' : 'outlined'}
            >
              <Stack direction="row" gap={1}>
                <Avatar />
                <Stack>
                  <Typography variant="subtitle2">{user.name}</Typography>
                  <Typography variant="caption">{user.email}</Typography>
                </Stack>
              </Stack>
            </Paper>
          </Stack>
          <Stack>
            <Typography variant="subtitle2" gutterBottom>
              {t('Password')}
            </Typography>
            <TextField
              value={'12345678'}
              variant="outlined"
              type="password"
              fullWidth
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <Tooltip title={tСommon('CopyToClipboard')}>
                    <IconButton color="primary" onClick={handleCopyPassword}>
                      <CopyIcon />
                    </IconButton>
                  </Tooltip>
                ),
              }}
            />
          </Stack>
          <Dialog.Actions sx={{ padding: 0 }}>
            <Button variant="contained" onClick={onClose}>
              {tСommon('Ok')}
            </Button>
          </Dialog.Actions>
        </Stack>
      </Dialog.Content>
    </Dialog>
  );
};

export { HandInPasswordModal };
