import { Suspense, useDeferredValue, useMemo, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Outlet } from 'react-router-dom';
import { Footer } from '@/shared/components';
import { useGetSearchParams } from '@/shared/hooks';
import { Container, Wrapper, HeaderBox, SearchContainer } from './style';
import { SearchForm } from '@/features/search/components';

const SearchHome = () => {
  const searchKeyword = useGetSearchParams('keyword');

  const [keyword, setKeyword] = useState<string>(
    searchKeyword ? decodeURIComponent(searchKeyword) : ''
  );

  const deferredValue = useDeferredValue(keyword);

  const lateKeyword = useMemo(() => {
    if (!keyword.length && keyword === '') {
      return keyword;
    }

    return deferredValue;
  }, [keyword, deferredValue]);

  const onInput = (word: string) => {
    setKeyword(word);
  };

  return (
    <>
      <Container>
        <Wrapper>
          <HeaderBox />
          <SearchForm keyword={keyword} onInput={onInput} />
          <SearchContainer>
            <ErrorBoundary fallback={<>Error처리</>}>
              <Suspense fallback={<>Loading...</>}>
                <Outlet context={{ keyword: lateKeyword, onInput }} />
              </Suspense>
            </ErrorBoundary>
          </SearchContainer>
        </Wrapper>
      </Container>
      <Footer />
    </>
  );
};

export default SearchHome;
