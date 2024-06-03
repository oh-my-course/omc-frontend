import { hobbyQueryOption } from '@/features/hobby/service';
import { GetVotesRequest, VoteLoaderProp, voteQueryOption } from '@/features/vote/service';

const VoteLoader = ({ request, queryClient }: VoteLoaderProp) => {
  const { searchParams } = new URL(request.url);
  const [getHobby, getStatus, getSort] = [
    searchParams.get('hobby') || 'basketball',
    (searchParams.get('status') || 'completed') as GetVotesRequest['status'],
    (searchParams.get('sort') || 'recent') as GetVotesRequest['sort'],
  ];

  return {
    data: Promise.all([
      queryClient.fetchQuery({ ...hobbyQueryOption.all(), staleTime: Infinity }),
      queryClient.fetchInfiniteQuery({
        ...voteQueryOption.list({
          hobby: getHobby,
          status: getStatus,
          sort: getSort,
        }),
      }),
      queryClient.fetchInfiniteQuery({
        ...voteQueryOption.list({
          hobby: getHobby,
          status: 'inprogress',
          size: 5,
        }),
      }),
    ]),
    paramsInfo: { getHobby, getSort, getStatus },
  };
};

export default VoteLoader;
