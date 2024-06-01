import { Box, Typography } from '@mui/material';
import { NewDiagnosticForm } from '../new-diagnostic-form';
import { Dialog } from '@/libs/components';

type NewDiagnosticDialogProps = {
  open: boolean;
  onClose: () => void;
};

const NewDiagnosticDialog = (props: NewDiagnosticDialogProps) => {
  const { open, onClose } = props;

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
          New Diagnostic
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
