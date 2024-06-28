import { useOutletContext } from 'react-router-dom';
import { SuspenseBoundary, Skeleton } from '@/shared/components';
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
        <SuspenseBoundary
          suspenseFallback={
            <Skeleton>
              <Skeleton.TextWrapper>
                <Skeleton.Text />
              </Skeleton.TextWrapper>
              <Skeleton.GridWrapper column={2} rows={5}>
                <Skeleton.GridItem count={10}>
                  <Skeleton.Text />
                </Skeleton.GridItem>
              </Skeleton.GridWrapper>
            </Skeleton>
          }
        >
          <RankList onInput={onInput} />
        </SuspenseBoundary>
      </Wrapper>
    </Container>
  ) : (
    <ListContainer>
      <SuspenseBoundary
        suspenseFallback={
          <Skeleton>
            <Skeleton.TextResult count={8} />
          </Skeleton>
        }
      >
        <SearchList keyword={keyword} onInput={onInput} />
      </SuspenseBoundary>
    </ListContainer>
  );
};

export default SearchMain;
