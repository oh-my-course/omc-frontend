import { useCallback, useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { CommonInput, CommonIcon, CommonIconButton } from '@/shared/components';
import { useDebounce } from '../../hooks';
import { Form } from './style';
import { searchLocalStorage } from '@/features/search/service';

interface SearchProps {
  keyword: string;
}

interface SearchFormProps {
  keyword: string;
  onInput?: (value: string) => void;
}

// props가 변경될때마다 다시 변경되는건 수정했다.
// 해당 form이 수정 중인지 아닌지에 대해서 확인 후 변경하는 로직을 구축한다.

const SearchForm = ({ keyword: currentKeyword, onInput }: SearchFormProps) => {
  const values = { keyword: currentKeyword };

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<SearchProps>({
    values,
  });

  const navigate = useNavigate();

  const formRef = useRef<HTMLFormElement | null>(null);

  const [isFocus, setIsFocus] = useState<boolean>(false);

  const keyword = useDebounce(watch(['keyword'])[0], 300);

  const { pathname } = useLocation();

  const isCancelIcon = watch(['keyword'])[0].length >= 1;

  const onSubmit: SubmitHandler<SearchProps> = (data, event) => {
    event?.preventDefault();
    const { keyword } = data;
    if (keyword.length === 0) {
      return;
    }
    searchLocalStorage(keyword);
    onInput && onInput(keyword);
    navigate(`/search/result?keyword=${encodeURIComponent(keyword)}`);
  };

  const handleDeleteBtnClick = () => {
    onInput && onInput('');
    navigate('/search');
  };

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

  useEffect(() => {
    if (currentKeyword !== keyword) {
      if (pathname.includes('/result')) {
        navigate('/search');
      }
      onInput && onInput(watch(['keyword'])[0]);
    }
  }, [currentKeyword, keyword, pathname, navigate, onInput, watch(['keyword'])[0]]);

  return (
    <Form isFocus={isFocus} ref={formRef} onSubmit={handleSubmit(onSubmit)}>
      <CommonInput
        onClick={() => setIsFocus(true)}
        placeholder="검색어를 입력해주세요!"
        error={errors.keyword}
        type="text"
        leftIcon={<CommonIcon type="search" />}
        rightIcon={
          isCancelIcon ? (
            <CommonIconButton type="cancel" onClick={() => handleDeleteBtnClick()} />
          ) : undefined
        }
        width="full"
        bg="white"
        {...register('keyword', { minLength: 1, required: '한글자 이상 입력해주세요!' })}
      />
    </Form>
  );
};

export default SearchForm;
