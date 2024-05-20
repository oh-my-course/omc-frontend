import { LoaderFunctionArgs, defer } from 'react-router-dom';
import { queryClient } from '@/core/query/QueryClientProvider';
import { hobbyQueryOption } from '@/features/hobby/service';
import { GetVotesRequest, voteQueryOption } from '@/features/vote/service';

const VoteLoader = ({ request }: LoaderFunctionArgs) => {
  const { searchParams } = new URL(request.url);
  const [getHobby, getStatus, getSort] = [
    searchParams.get('hobby') || 'basketball',
    searchParams.get('status') || 'completed',
    searchParams.get('sort') || 'recent',
  ];

  return defer({
    data: Promise.all([
      queryClient.fetchQuery({ ...hobbyQueryOption.all(), staleTime: Infinity }),
      queryClient.fetchInfiniteQuery({
        ...voteQueryOption.list({
          hobby: getHobby,
          status: getStatus as GetVotesRequest['status'],
          sort: getSort as GetVotesRequest['sort'],
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
  });
};

export default VoteLoader;
