import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { CommonInput, CommonIcon, CommonIconButton } from '@/shared/components';
import { Form } from './style';
import { useSearchFocus } from '@/features/search/hooks';
import { searchLocalStorage } from '@/features/search/service';

interface SearchProps {
  keyword: string;
}

interface SearchFormProps {
  keyword: string;
  onInput?: (value: string) => void;
}

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

  const { formRef, isFocus, setIsFocus } = useSearchFocus();

  const navigate = useNavigate();

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

  useEffect(() => {
    const keyword = watch(['keyword'])[0];
    if (currentKeyword !== keyword) {
      if (pathname.includes('/result') && formRef) {
        navigate('/search');
      }
      onInput && onInput(keyword);
    }
  }, [formRef, pathname, navigate, onInput, watch(['keyword']), currentKeyword]);

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
