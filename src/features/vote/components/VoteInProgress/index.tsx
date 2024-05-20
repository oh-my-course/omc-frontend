import { useSearchParams } from 'react-router-dom';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { CommonText } from '@/shared/components';
import { useIntersectionObserver } from '@/shared/hooks';
import VoteInProgressItem from '../VoteInProgressItem';
import { Container, TitleWrapper, ContentsWrapper, NoVotesInProgress } from './style';
import { voteQueryOption } from '@/features/vote/service';

const VoteInProgress = () => {
  const [searchParams] = useSearchParams();
  const getHobby = searchParams.get('hobby') || 'basketball';

  const {
    data: votesInProgressData,
    fetchNextPage,
    hasNextPage,
  } = useSuspenseInfiniteQuery({
    ...voteQueryOption.list({
      hobby: getHobby,
      status: 'inprogress',
      size: 5,
    }),
    select: (data) => data?.pages.flatMap(({ votes }) => votes),
  });

  const isData = Boolean(votesInProgressData.length !== 0);

  const ref = useIntersectionObserver({ onObserve: fetchNextPage });

  return (
    <Container>
      <TitleWrapper>
        <CommonText type="normalInfo">진행중인 투표</CommonText>
      </TitleWrapper>
      <ContentsWrapper>
        {isData ? (
          <>
            {votesInProgressData?.map(({ cursorId, item1Info, item2Info, voteInfo }) => {
              <VoteInProgressItem
                cursorId={cursorId}
                item1Info={item1Info}
                item2Info={item2Info}
                voteInfo={voteInfo}
              />;
            })}
            {hasNextPage && <div ref={ref} />}
          </>
        ) : (
          <NoVotesInProgress> 진행중인 투표가 없습니다.</NoVotesInProgress>
        )}
      </ContentsWrapper>
    </Container>
  );
};

export default VoteInProgress;
