import { useDeferredValue, useMemo } from 'react';

const useKeyword = (currentKeyword: string) => {
  const deferredValue = useDeferredValue(currentKeyword);

  const lateKeyword = useMemo(() => {
    if (!currentKeyword.length && currentKeyword === '') {
      return currentKeyword;
    }

    return deferredValue;
  }, [currentKeyword, deferredValue]);

  return lateKeyword;
};

export default useKeyword;
