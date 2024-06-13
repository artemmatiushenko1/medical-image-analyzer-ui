import { enqueueSnackbar } from 'notistack';

const showNotification = (
  message: string,
  type: 'success' | 'error' | 'info' | 'warning',
) => {
  enqueueSnackbar(message, { variant: type });
};

export { showNotification };
