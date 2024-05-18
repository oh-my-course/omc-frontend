import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { CommonText, DividerImage } from '@/shared/components';
import { useIntersectionObserver } from '@/shared/hooks';
import { voteQueryOption } from '../../service';
import { Container, TitleWrapper, ContentsWrapper, ContentsBox, NoVotesInProgress } from './style';

const VoteInProgress = () => {
  const [searchParams] = useSearchParams();
  const getHobby = searchParams.get('hobby') || 'basketball';
  const navigate = useNavigate();

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
  const ref = useIntersectionObserver({ onObserve: fetchNextPage });

  return (
    <Container>
      {votesInProgressData?.length !== 0 ? (
        <>
          <TitleWrapper>
            <CommonText type="normalInfo">진행중인 투표</CommonText>
          </TitleWrapper>
          <ContentsWrapper>
            {votesInProgressData?.map(({ cursorId, item1Info, item2Info, voteInfo }) => {
              return (
                <ContentsBox
                  key={cursorId}
                  onClick={() => {
                    navigate(`${voteInfo.id}`);
                  }}
                >
                  <DividerImage type="live" images={[item1Info.image, item2Info.image]} />
                  <CommonText type="smallInfo">{voteInfo.participants}명 참여중!</CommonText>
                </ContentsBox>
              );
            })}
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
