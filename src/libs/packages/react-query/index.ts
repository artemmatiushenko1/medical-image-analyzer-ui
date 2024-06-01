import { QueryClient } from '@tanstack/react-query';
import { createQueryKey } from './create-query-key.helper';

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

export { queryClient, createQueryKey };
