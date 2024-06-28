import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { CommonTabs, Skeleton, SuspenseBoundary } from '@/shared/components';
import { SearchWrapper, SearchBox } from './style';
import { SearchItemList, SearchVoteList } from '@/features/search/components';
import { SearchListProps } from '@/pages/Search/SearchMain';

const TABS = {
  ITEM: {
    VALUE: 'item',
    LABEL: '아이템',
  },
  VOTE: {
    VALUE: 'vote',
    LABEL: '투표',
  },
};

const SearchResult = () => {
  const { keyword } = useOutletContext<SearchListProps>();
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  return (
    <>
      <CommonTabs
        padding="1rem 0"
        currentTabIndex={currentIndex}
        tabsType="line"
        isFitted
        onClick={(value) => (value.includes('item') ? setCurrentIndex(0) : setCurrentIndex(1))}
        tabsData={[
          {
            label: TABS.ITEM.LABEL,
            value: TABS.ITEM.VALUE,
            content: (
              <SearchWrapper>
                <SearchBox>
                  <SuspenseBoundary
                    suspenseFallback={
                      <Skeleton>
                        <Skeleton.TextWrapper>
                          <Skeleton.Text />
                        </Skeleton.TextWrapper>
                        <Skeleton.GridWrapper column={3} rows={4}>
                          <Skeleton.GridItem count={11}>
                            <Skeleton.Item />
                          </Skeleton.GridItem>
                        </Skeleton.GridWrapper>
                      </Skeleton>
                    }
                  >
                    <SearchItemList keyword={keyword} />
                  </SuspenseBoundary>
                </SearchBox>
              </SearchWrapper>
            ),
          },
          {
            label: TABS.VOTE.LABEL,
            value: TABS.VOTE.VALUE,
            content: (
              <SearchWrapper>
                <SearchBox>
                  <SuspenseBoundary
                    suspenseFallback={
                      <Skeleton>
                        <Skeleton.TextWrapper>
                          <Skeleton.Text />
                        </Skeleton.TextWrapper>
                        <Skeleton.VoteContainer>
                          <Skeleton.VoteWrapper>
                            <Skeleton.Vote count={3} />
                          </Skeleton.VoteWrapper>
                        </Skeleton.VoteContainer>
                      </Skeleton>
                    }
                  >
                    <SearchVoteList keyword={keyword} />
                  </SuspenseBoundary>
                </SearchBox>
              </SearchWrapper>
            ),
          },
        ]}
      />
    </>
  );
};

export default SearchResult;
