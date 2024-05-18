import { useSearchParams } from 'react-router-dom';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { useIntersectionObserver } from '@/shared/hooks';
import { VoteItem } from '..';
import { GetVotesRequest, voteQueryOption } from '../../service';
import { NoResult } from '../Votes/style';

interface VoteListProps {
  label: string;
}

const VoteList = ({ label }: VoteListProps) => {
  const [searchParams] = useSearchParams();
  const getHobby = searchParams.get('hobby');
  const getStatus = searchParams.get('status');
  const getSort = searchParams.get('sort');
  const {
    data: votesData,
    fetchNextPage,
    hasNextPage,
  } = useSuspenseInfiniteQuery({
    ...voteQueryOption.list({
      hobby: getHobby || 'baseball',
      status: (getStatus as GetVotesRequest['status']) || 'completed',
      sort: (getSort as GetVotesRequest['sort']) || 'recent',
    }),
    select: (data) => data?.pages.flatMap(({ votes }) => votes),
  });

  const ref = useIntersectionObserver({ onObserve: fetchNextPage });

  return votesData?.length !== 0 ? (
    <>
      {votesData?.map(({ cursorId, item1Info, item2Info, voteInfo }) => {
        return (
          <VoteItem
            key={cursorId}
            item1Info={item1Info}
            item2Info={item2Info}
            voteInfo={voteInfo}
          />
        );
      })}
      {hasNextPage && <div ref={ref} />}
    </>
  ) : (
    <NoResult>{`${label}가 존재하지 않습니다.`}</NoResult>
  );
};

export default VoteList;
