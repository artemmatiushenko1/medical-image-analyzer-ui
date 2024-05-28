import { IconButton, alpha } from '@mui/material';
import { useDialogContext } from './dialog.context';
import { CloseRounded } from '@mui/icons-material';

const Close = () => {
  const { onClose } = useDialogContext();

  return (
    <IconButton
      color="primary"
      onClick={onClose}
      sx={{
        color: ({ palette }) => palette.primary.main,
        background: ({ palette }) => alpha(palette.primary.main, 0.05),
      }}
    >
      <CloseRounded />
    </IconButton>
  );
};

export { Close };
