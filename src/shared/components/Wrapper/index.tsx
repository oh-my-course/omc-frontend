import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { CommonSpinner, ErrorElement } from '@/shared/components';
import type { ChildrenType } from '@/shared/types';
import { Center } from './style';

interface WrapperProps extends ChildrenType {
  suspenseFallback?: ChildrenType['children'];
}

const Wrapper = ({
  children,
  suspenseFallback = (
    <Center>
      <CommonSpinner size="xl" />
    </Center>
  ),
}: WrapperProps) => {
  return (
    <ErrorBoundary fallbackRender={(props) => <ErrorElement {...props} />}>
      <Suspense fallback={suspenseFallback}>{children}</Suspense>
    </ErrorBoundary>
  );
};

export default Wrapper;
