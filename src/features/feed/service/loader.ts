import feedQueryOption from './queryOption';
import { hobbyQueryOption } from '@/features/hobby/service';
import { GetVotesRequest, LoaderProp } from '@/features/vote/service';

const FeedLoader = ({ request, queryClient }: LoaderProp) => {
  const { searchParams } = new URL(request.url);

  const [getHobby, getSort] = [
    searchParams.get('hobby') || 'basketball',
    (searchParams.get('sort') || 'recent') as GetVotesRequest['sort'],
  ];

  return {
    data: Promise.all([
      queryClient.fetchQuery({ ...hobbyQueryOption.all(), staleTime: Infinity }),
      queryClient.fetchInfiniteQuery({
        ...feedQueryOption.list({
          hobbyName: getHobby,
          sortCondition: getSort,
        }),
      }),
    ]),
    paramsInfo: { getHobby, getSort },
  };
};

export default FeedLoader;
