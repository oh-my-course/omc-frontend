import { createBrowserRouter } from 'react-router-dom';
import { queryClient } from '@/core/query';
import { SuspenseBoundary, Skeleton } from '@/shared/components';
import App from '@/App';
import { FeedLoader } from '@/features/feed/service';
import { VoteLoader } from '@/features/vote/service';
import {
  FeedCreate,
  FeedDetail,
  FeedHome,
  MemberHome,
  Home,
  Item,
  ItemCreate,
  ItemReview,
  ItemDetail,
  VoteHome,
  VoteCreate,
  VoteDetail,
  BucketCreate,
  Login,
  Signup,
  MemberEdit,
  MemberPassword,
  ItemReviewEdit,
  InventoryHome,
  InventoryDetail,
  InventoryCreate,
  SearchMain,
  SearchHome,
  FeedUpdate,
  SearchResult,
  BucketHome,
  BucketDetail,
  BucketUpdate,
  FeedMember,
  NotFound,
} from '@/pages';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Home />,
        children: [
          {
            path: 'feed',
            loader: ({ request }) => FeedLoader({ request, queryClient }),
            element: (
              <SuspenseBoundary
                suspenseFallback={
                  <Skeleton>
                    <Skeleton.TextWrapper>
                      <Skeleton.Text />
                    </Skeleton.TextWrapper>
                    <Skeleton.FeedContainer>
                      <Skeleton.Feed count={3} />
                    </Skeleton.FeedContainer>
                  </Skeleton>
                }
              >
                <FeedHome />
              </SuspenseBoundary>
            ),
          },
          {
            path: 'vote',
            loader: ({ request }) => VoteLoader({ request, queryClient }),
            element: (
              <SuspenseBoundary
                suspenseFallback={
                  <Skeleton>
                    <Skeleton.TextWrapper>
                      <Skeleton.Text />
                    </Skeleton.TextWrapper>
                    <Skeleton.InProGressVoteContainer>
                      <Skeleton.InProgressVoteWrapper>
                        <Skeleton.InProgressVote count={5} />
                      </Skeleton.InProgressVoteWrapper>
                    </Skeleton.InProGressVoteContainer>
                    <Skeleton.VoteContainer>
                      <Skeleton.VoteWrapper>
                        <Skeleton.Vote count={3} />
                      </Skeleton.VoteWrapper>
                    </Skeleton.VoteContainer>
                  </Skeleton>
                }
              >
                <VoteHome />
              </SuspenseBoundary>
            ),
          },
        ],
      },
      {
        path: 'feed/create',
        element: <FeedCreate />,
      },
      {
        path: 'feed/:feedId',
        element: <FeedDetail />,
      },
      {
        path: 'feed/:feedId/edit',
        element: <FeedUpdate />,
      },
      {
        path: 'vote/create',
        element: <VoteCreate />,
      },
      {
        path: 'vote/:voteId',
        element: <VoteDetail />,
      },
      {
        path: 'search',
        element: <SearchHome />,
        children: [
          {
            path: '',
            element: <SearchMain />,
          },
          {
            path: 'result',
            element: <SearchResult />,
          },
        ],
      },
      {
        path: 'item',
        element: <Item />,
      },
      {
        path: 'item/create',
        element: <ItemCreate />,
      },
      {
        path: 'item/:itemId',
        element: <ItemDetail />,
      },
      {
        path: 'item/:itemId/review/create',
        element: <ItemReview />,
      },
      {
        path: 'item/:itemId/review/:reviewId/edit',
        element: <ItemReviewEdit />,
      },
      {
        path: 'member/edit',
        element: <MemberEdit />,
      },
      {
        path: 'member/edit/password',
        element: <MemberPassword />,
      },
      {
        path: 'member/:nickname',
        element: <MemberHome />,
      },
      {
        path: 'member/:nickname/inventory',
        element: <InventoryHome />,
      },
      {
        path: 'member/:nickname/inventory/:inventoryId',
        element: <InventoryDetail />,
      },
      {
        path: 'inventory/create',
        element: <InventoryCreate />,
      },
      {
        path: 'member/:nickname/bucket',
        element: <BucketHome />,
      },
      {
        path: 'member/:nickname/bucket/:bucketId',
        element: <BucketDetail />,
      },
      {
        path: 'bucket/create',
        element: <BucketCreate />,
      },
      {
        path: 'bucket/:bucketId/edit',
        element: <BucketUpdate />,
      },
      {
        path: 'member/:nickname/feed',
        element: <FeedMember />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'signup',
        element: <Signup />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);
