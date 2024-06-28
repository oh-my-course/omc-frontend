import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { CommonDivider } from '@/shared/components';
import { useIntersectionObserver } from '@/shared/hooks';
import { NoResult, ObservedBox } from './style';
import { FeedItem } from '@/features/feed/components';
import { feedQueryOption } from '@/features/feed/service';

interface FeedHomeListProps {
  hobbyName: string;
  sortCondition: string;
}

const FeedHomeList = ({ hobbyName, sortCondition }: FeedHomeListProps) => {
  const navigate = useNavigate();

  const feeds = useSuspenseInfiniteQuery({ ...feedQueryOption.list({ hobbyName, sortCondition }) });

  const observedRef = useIntersectionObserver({ onObserve: feeds.fetchNextPage });

  if (feeds.data.pages[0].feeds.length === 0) {
    return <NoResult>피드가 존재하지 않습니다.</NoResult>;
  }

  return (
    <>
      {feeds.data.pages.map((page) =>
        page.feeds.map(
          ({
            feedId,
            memberInfo,
            content,
            isLike,
            likeCount,
            commentCount,
            createdAt,
            feedItems,
          }) => (
            <Fragment key={feedId}>
              <FeedItem
                memberInfo={memberInfo}
                feedId={feedId}
                feedContent={content}
                isLike={isLike}
                likeCount={likeCount}
                commentCount={commentCount}
                createdAt={createdAt}
                feedItems={feedItems}
                isDetail={false}
                onClick={() => navigate(`./${feedId}`)}
              />
              <CommonDivider size="sm" />
            </Fragment>
          )
        )
      )}
      {feeds.hasNextPage ? <ObservedBox ref={observedRef} /> : <ObservedBox />}
    </>
  );
};

export default FeedHomeList;
