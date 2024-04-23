import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Footer } from '@/shared/components';
import { Container, Wrapper, HeaderBox, SearchContainer } from './style';
import { SearchForm } from '@/features/search/components';
import useGetSearchParams from '@/shared/hooks/useGetSearchParams';

const SearchHome = () => {
  const searchKeywrod = useGetSearchParams('keyword');

  const [keyword, setKeyword] = useState<string>(
    searchKeywrod ? decodeURIComponent(searchKeywrod) : ''
  );

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
            <Outlet context={{ keyword, onInput }} />
          </SearchContainer>
        </Wrapper>
      </Container>
      <Footer />
    </>
  );
};

export default SearchHome;
