import type { FallbackProps } from 'react-error-boundary';
import CommonButton from '../Button';
import { Container } from './style';
import type { AxiosError } from 'axios';

interface ErrorProps extends FallbackProps {
  error: AxiosError;
}

const ErrorElement = ({ error, resetErrorBoundary }: ErrorProps) => {
  return (
    <Container>
      <h1>{error.response?.status}</h1>
      <p>{error.message}</p>
      <CommonButton
        type="text"
        onClick={() => {
          resetErrorBoundary();
        }}
      >
        다시 시도
      </CommonButton>
    </Container>
  );
};

export default ErrorElement;
