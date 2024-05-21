import { useLoaderData } from 'react-router-dom';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { useIntersectionObserver } from '@/shared/hooks';
import { VoteItem } from '..';
import { ParamsInfo, voteQueryOption } from '../../service';
import { NoResult } from '../Votes/style';

interface VoteListProps {
  label: string;
}

const VoteList = ({ label }: VoteListProps) => {
  const {
    paramsInfo: { getStatus, getHobby, getSort },
  } = useLoaderData() as ParamsInfo;

  const {
    data: votesData,
    fetchNextPage,
    hasNextPage,
  } = useSuspenseInfiniteQuery({
    ...voteQueryOption.list({
      hobby: getHobby,
      status: getStatus,
      sort: getSort,
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
