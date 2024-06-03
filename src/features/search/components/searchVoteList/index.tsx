import { useNavigate } from 'react-router-dom';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import {
  CommonButton,
  CommonCard,
  CommonDivider,
  CommonIcon,
  CommonImage,
  CommonText,
} from '@/shared/components';
import { useAuthNavigate, useIntersectionObserver } from '@/shared/hooks';
import { formatNumber } from '@/shared/utils';
import { SearchListItemProp } from '../searchItemList';
import {
  Wrapper,
  ContentsContainer,
  ContentsWrapper,
  VoteImageWrapper,
  VsBox,
  Box,
  TextBox,
  NoResult,
  VoteItemContentsBox,
} from './style';
import { searchQueryOption } from '@/features/search/service';

const SearchVoteList = ({ keyword }: SearchListItemProp) => {
  const { data, hasNextPage, fetchNextPage } = useSuspenseInfiniteQuery({
    ...searchQueryOption.infiniteVoteList({ keyword: encodeURIComponent(keyword), size: 12 }),
    select: (data) => {
      return {
        totalCount: data.pages[0].totalVoteCount,
        votes: data.pages.flatMap(({ votes }) => votes),
      };
    },
  });

  const authNavigate = useAuthNavigate();

  const navigate = useNavigate();

  const ref = useIntersectionObserver({ onObserve: fetchNextPage });

  if (data.totalCount === 0) {
    return <NoResult>검색결과가 없습니다...</NoResult>;
  }

  return (
    <>
      <Box>
        <TextBox>
          <CommonText type="subStrongInfo">총 {data.totalCount}개의 투표</CommonText>
        </TextBox>
        <>
          {data.votes.map(({ item1Info, item2Info, voteInfo }) => (
            <CommonCard
              count={3}
              date={voteInfo.startTime}
              onClick={() => {
                navigate(`/vote/${voteInfo.id}`);
              }}
              key={voteInfo.id}
            >
              <ContentsContainer>
                <CommonText type="smallInfo">{voteInfo.content}</CommonText>
                <ContentsWrapper>
                  <VoteImageWrapper>
                    <CommonImage size="base" src={item1Info.image} />
                    <VoteItemContentsBox>
                      <CommonText type="smallInfo">{formatNumber(item1Info.price)}</CommonText>
                      <CommonText type="smallInfo">{item1Info.name}</CommonText>
                    </VoteItemContentsBox>
                  </VoteImageWrapper>
                  <VsBox>
                    <CommonText type="smallInfo" noOfLines={0}>
                      VS
                    </CommonText>
                  </VsBox>
                  <VoteImageWrapper>
                    <CommonImage size="base" src={item2Info.image} />
                    <VoteItemContentsBox>
                      <CommonText type="smallInfo">{formatNumber(item2Info.price)}</CommonText>
                      <CommonText type="smallInfo">{item2Info.name}</CommonText>
                    </VoteItemContentsBox>
                  </VoteImageWrapper>
                </ContentsWrapper>
              </ContentsContainer>
            </CommonCard>
          ))}
          {hasNextPage && <div ref={ref} />}
        </>
        <CommonDivider size="sm" />
        <div>
          <CommonText type="smallInfo">투표 검색결과 페이지가 없습니다!</CommonText>
          <Wrapper onClick={() => authNavigate('/vote/create')}>
            <CommonButton type="text">투표 작성하러 가기</CommonButton>
            <CommonIcon type="chevronRight" />
          </Wrapper>
        </div>
      </Box>
    </>
  );
};

export default SearchVoteList;
