import { Suspense, useDeferredValue, useState } from 'react';
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

  const lateKeyword = useDeferredValue(keyword);
  // const lateKeyword = useMemo(() => deferredValue, [keyword]);

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
            <Suspense fallback={<>Loading...</>}>
              <Outlet context={{ keyword: lateKeyword, onInput }} />
            </Suspense>
          </SearchContainer>
        </Wrapper>
      </Container>
      <Footer />
    </>
  );
};

export default SearchHome;
