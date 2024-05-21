import { PropsWithChildren } from 'react';
import { QueryClientProvider as BaseQueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from './';

const QueryClientProvider = (props: PropsWithChildren<unknown>) => {
  const { children } = props;

  return (
    <BaseQueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </BaseQueryClientProvider>
  );
};

export default QueryClientProvider;
