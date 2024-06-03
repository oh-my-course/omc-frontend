import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query';
import { GetVotesRequest, voteApi } from '.';

const voteQueryOption = {
  all: ['vote'] as const,
  list: ({ hobby, sort = 'recent', status, size }: GetVotesRequest) =>
    infiniteQueryOptions({
      queryKey: [...voteQueryOption.all, hobby, status, sort] as const,
      queryFn: ({ pageParam: cursorId }) => {
        return voteApi.getVotes({ hobby, sort, status, cursorId, size });
      },
      initialPageParam: '',
      getNextPageParam: (data) => {
        return data.nextCursorId;
      },
      staleTime: 1000 * 20,
    }),
  detail: (voteId: number) =>
    queryOptions({
      queryKey: [...voteQueryOption.all, voteId] as const,
      queryFn: () => voteApi.getVoteDetail(voteId),
    }),
};

export default voteQueryOption;
