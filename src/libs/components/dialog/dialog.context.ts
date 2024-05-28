import { createContext, useContext } from 'react';

type DialogContext = {
  open: boolean;
  onClose: () => void;
};

const DialogContext = createContext<DialogContext>({
  open: false,
  onClose: () => {},
});

const useDialogContext = () => useContext(DialogContext);

const DialogContextProvider = DialogContext.Provider;

export { useDialogContext, DialogContextProvider };
