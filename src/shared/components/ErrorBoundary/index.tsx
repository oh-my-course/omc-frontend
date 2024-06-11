import { ErrorBoundary as ReactErrorBoundary, type ErrorBoundaryProps } from 'react-error-boundary';
import { QueryErrorResetBoundary } from '@tanstack/react-query';

const ErrorBoundary = ({ children, ...restProps }: ErrorBoundaryProps) => {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ReactErrorBoundary {...restProps} onReset={reset}>
          {children}
        </ReactErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};

export default ErrorBoundary;
