import { Fragment } from 'react';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { CommonDivider } from '@/shared/components';
import { useIntersectionObserver } from '@/shared/hooks';
import { NoResult, ObservedBox } from './style';
import { CommentItem } from '@/features/comment/components';
import { commentQueryQption } from '@/features/comment/service';

interface CommentListProps {
  feedId: number;
  hasAdoptedComment: boolean;
  isOwnFeed: boolean;
  setSelectedCommentId: (value: React.SetStateAction<number>) => void;
  setDeleteStatus: (value: React.SetStateAction<'feed' | 'comment'>) => void;
  onDeleteOpen: () => void;
  setValue: (name: 'content', value: string) => void;
  setIsUpdating: (value: React.SetStateAction<boolean>) => void;
  setUpdatingCommentId: (value: React.SetStateAction<number>) => void;
}

const CommentList = ({
  feedId,
  hasAdoptedComment,
  isOwnFeed,
  setSelectedCommentId,
  setDeleteStatus,
  onDeleteOpen,
  setValue,
  setIsUpdating,
  setUpdatingCommentId,
}: CommentListProps) => {
  const comment = useSuspenseInfiniteQuery(commentQueryQption.infiniteList({ feedId, size: 3 }));

  const observedRef = useIntersectionObserver({ onObserve: comment.fetchNextPage });

  if (comment.data.pages[0].totalCount === 0) {
    return <NoResult>댓글이 존재하지 않습니다.</NoResult>;
  }

  return (
    <>
      {comment.data.pages.map((page) =>
        page.comments.map((data) => (
          <Fragment key={data.commentId}>
            <CommentItem
              feedId={feedId}
              commentId={data.commentId}
              memberInfo={data.memberInfo}
              content={data.content}
              createdAt={data.createdAt}
              isAdopted={data.isAdopted}
              isOwnFeed={isOwnFeed}
              hasAdoptedComment={hasAdoptedComment}
              onDelete={() => {
                setSelectedCommentId(data.commentId);
                setDeleteStatus('comment');
                onDeleteOpen();
              }}
              onUpdate={() => {
                setValue('content', data.content);
                setIsUpdating(true);
                setUpdatingCommentId(data.commentId);
              }}
            />
            <CommonDivider size="sm" />
          </Fragment>
        ))
      )}
      {comment.hasNextPage && <ObservedBox ref={observedRef} />}
    </>
  );
};

export default CommentList;
