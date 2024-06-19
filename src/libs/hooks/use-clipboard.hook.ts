import { useRef } from 'react';
import { showNotification } from '../helpers';

const useClipboard = () => {
  const clipboard = useRef(window.navigator.clipboard);

  const copy = (text: string, notificationMessage?: string) => {
    clipboard.current
      .writeText(text)
      .then(() => {
        if (notificationMessage) {
          showNotification(notificationMessage, 'info');
        }
      })
      .catch((err) => {
        console.error('Failed to copy to clipboard: ', err);
      });
  };

  return { copy };
};

export { useClipboard };
