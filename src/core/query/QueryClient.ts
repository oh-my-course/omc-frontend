import { QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      refetchOnWindowFocus: false,
      throwOnError: true,
    },
    mutations: {
      retry: 0,
      throwOnError: true,
    },
  },
});

export default queryClient;
