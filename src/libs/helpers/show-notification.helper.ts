import { toast } from 'react-toastify';

const showNotification = (
  message: string,
  type: 'success' | 'error' | 'info' | 'warning',
) => {
  toast(message, { type });
};

export { showNotification };
