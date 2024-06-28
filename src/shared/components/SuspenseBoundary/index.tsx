import { Suspense } from 'react';
import { CommonSpinner, ErrorElement, ErrorBoundary } from '@/shared/components';
import type { ChildrenType } from '@/shared/types';
import DeferredComponent from '../DeferredComponent';
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
  const fallback = <DeferredComponent>{suspenseFallback}</DeferredComponent>;

  return (
    <ErrorBoundary fallbackRender={(props) => <ErrorElement {...props} />}>
      <Suspense fallback={fallback}>{children}</Suspense>
    </ErrorBoundary>
  );
};

export default SuspenseBoundary;
