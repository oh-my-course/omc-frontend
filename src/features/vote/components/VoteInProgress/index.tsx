import { useLoaderData } from 'react-router-dom';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { CommonText } from '@/shared/components';
import { useIntersectionObserver } from '@/shared/hooks';
import { Container, TitleWrapper, ContentsWrapper, NoVotesInProgress } from './style';
import { VoteInProgressItem } from '@/features/vote/components';
import { ParamsInfo, voteQueryOption } from '@/features/vote/service';

const VoteInProgress = () => {
  const {
    paramsInfo: { getHobby },
  } = useLoaderData() as ParamsInfo;

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
      {isData ? (
        <>
          <TitleWrapper>
            <CommonText type="normalInfo">진행중인 투표</CommonText>
          </TitleWrapper>
          <ContentsWrapper>
            {votesInProgressData.map(({ cursorId, item1Info, item2Info, voteInfo }) => (
              <VoteInProgressItem
                key={cursorId}
                cursorId={cursorId}
                item1Info={item1Info}
                item2Info={item2Info}
                voteInfo={voteInfo}
              />
            ))}
            {hasNextPage && <div ref={ref} />}
          </ContentsWrapper>
        </>
      ) : (
        <NoVotesInProgress> 진행중인 투표가 없습니다.</NoVotesInProgress>
      )}
    </Container>
  );
};

export default VoteInProgress;
