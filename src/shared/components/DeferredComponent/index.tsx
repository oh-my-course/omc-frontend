import { useEffect, useState } from 'react';
import type { ChildrenType } from '@/shared/types';

const DeferredComponent = ({ children }: ChildrenType) => {
  const [isDeferred, setIsDeferred] = useState<boolean>(false);

  useEffect(() => {
    const currentId = setTimeout(() => {
      setIsDeferred(true);
    }, 200);

    return () => clearTimeout(currentId);
  }, []);

  if (!isDeferred) {
    return null;
  }

  return <>{children}</>;
};

export default DeferredComponent;
