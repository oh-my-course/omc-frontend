import { useOutletContext } from 'react-router-dom';
import { Container, Wrapper, ListContainer } from './style';
import { RankList } from '@/features/rank/components';
import { LatelySearch, SearchList } from '@/features/search/components';
export interface SearchListProps {
  keyword: string;
  onInput: (word: string) => void;
}

const SearchMain = () => {
  const { keyword, onInput } = useOutletContext<SearchListProps>();

  const isWord = !keyword || keyword.length <= 0;

  return isWord ? (
    <Container>
      <Wrapper>
        <LatelySearch onInput={onInput} />
      </Wrapper>
      <Wrapper>
        <RankList onInput={onInput} />
      </Wrapper>
    </Container>
  ) : (
    <ListContainer>
      <SearchList keyword={keyword} onInput={onInput} />
    </ListContainer>
  );
};

export default SearchMain;
