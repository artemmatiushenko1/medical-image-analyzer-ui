import { Box, Typography } from '@mui/material';
import { NewDiagnosticForm } from '../new-diagnostic-form';
import { Dialog } from '@/libs/components';
import { useTranslation } from 'react-i18next';

type NewDiagnosticDialogProps = {
  open: boolean;
  onClose: () => void;
};

const NewDiagnosticDialog = (props: NewDiagnosticDialogProps) => {
  const { open, onClose } = props;

  const { t } = useTranslation('Diagnostics');

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      PaperProps={{ sx: { width: '400px' } }}
    >
      <Dialog.Title
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="h6" fontSize={18}>
          {t('NewDiagnosticDialog.Title')}
        </Typography>
        <Dialog.Close />
      </Dialog.Title>
      <Dialog.Content>
        <Box sx={{ pt: 2 }}>
          <NewDiagnosticForm onSuccess={onClose} />
        </Box>
      </Dialog.Content>
    </Dialog>
  );
};

export { NewDiagnosticDialog };
