import { Suspense } from 'react';
import { CommonSpinner, ErrorElement, ErrorBoundary } from '@/shared/components';
import type { ChildrenType } from '@/shared/types';
import { Center } from './style';

interface WrapperProps extends ChildrenType {
  suspenseFallback?: ChildrenType['children'];
}

const SuspenseBoundary = ({
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

export default SuspenseBoundary;
