import {
  DialogContent,
  DialogTitle,
  Dialog as MuiDialog,
  DialogProps as MuiDialogProps,
} from '@mui/material';
import { DialogContextProvider } from './dialog.context';
import { Close } from './close';

type DialogProps = Omit<MuiDialogProps, 'onClose'> & { onClose: () => void };

const Dialog = (props: DialogProps) => {
  const { open, onClose } = props;

  return (
    <DialogContextProvider value={{ open, onClose }}>
      <MuiDialog {...props} />
    </DialogContextProvider>
  );
};

Dialog.Close = Close;
Dialog.Title = DialogTitle;
Dialog.Content = DialogContent;

export { Dialog };
