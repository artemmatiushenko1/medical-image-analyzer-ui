import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query';
import { createQueryKey } from './create-query-key.helper';
import { showNotification } from '@/libs/helpers';

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
  queryCache: new QueryCache({
    onError: (error) => {
      showNotification(error.message, 'error');
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      showNotification(error.message, 'error');
    },
  }),
});

export { queryClient, createQueryKey };
