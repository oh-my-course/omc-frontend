import { useCallback, useEffect, useRef, useState } from 'react';

const useSearchFocus = () => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [isFocus, setIsFocus] = useState<boolean>(false);

  const handleInputFocusClick = useCallback(
    (event: MouseEvent) => {
      if (formRef.current?.contains(event.target as Node) === false && isFocus) {
        setIsFocus(false);
      }
    },
    [formRef, isFocus]
  );

  useEffect(() => {
    document.addEventListener('click', handleInputFocusClick);

    return () => {
      document.removeEventListener('click', handleInputFocusClick);
    };
  }, [handleInputFocusClick]);

  return { formRef, isFocus, setIsFocus };
};

export default useSearchFocus;
