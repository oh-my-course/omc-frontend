import { useEffect, useState } from 'react';

const useDebounce = (value: string[], delay: number) => {
  const [debounceValue, setDebounceValue] = useState<string>(value[0]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(value[0]);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debounceValue;
};

export default useDebounce;
