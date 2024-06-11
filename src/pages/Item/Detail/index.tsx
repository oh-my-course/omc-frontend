import { Fragment } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSuspenseQuery, useSuspenseInfiniteQuery } from '@tanstack/react-query';
import {
  CommonButton,
  CommonDivider,
  CommonIcon,
  CommonImage,
  CommonText,
  Header,
} from '@/shared/components';
import { useAuthCheck, useIntersectionObserver } from '@/shared/hooks';
import { formatNumber } from '@/shared/utils';
import {
  Container,
  ItemWrapper,
  ItemBox,
  ButtonWrapper,
  CommentNumberWrapper,
  CommentsContainer,
  Box,
  NoResult,
  ItemContentsBox,
} from './style';
import { ItemComment } from '@/features/item/components';
import { useTakeItem } from '@/features/item/hooks';
import { itemQueryOption } from '@/features/item/service';
import { reviewQueryOption } from '@/features/review/service';

const ItemDetail = () => {
  const { itemId } = useParams();

  const navigate = useNavigate();

  const isLogin = useAuthCheck();

  const { data } = useSuspenseQuery({
    ...itemQueryOption.detail(Number(itemId)),
    initialData: {
      itemInfo: { id: 0, name: '', price: 0, image: '' },
      itemUrl: '',
      itemAvgRate: 0,
      isMemberItem: false,
      isReviewed: false,
    },
  });

  const {
    data: reviewInfo,
    hasNextPage,
    fetchNextPage,
  } = useSuspenseInfiniteQuery({
    ...reviewQueryOption.infiniteList({ itemId: Number(itemId), size: 2 }),
    select: (data) => {
      return {
        totalCount: data.pages[0].itemReviewTotalCount,
        reviews: data.pages.flatMap(({ reviews }) => reviews),
      };
    },
  });

  const ref = useIntersectionObserver({ onObserve: fetchNextPage });

  const { mutate: itemTakeMutate } = useTakeItem();

  const isReviewed = reviewInfo?.reviews.findIndex(({ isReviewed }) => isReviewed);

  const handleItem = () => {
    itemTakeMutate([String(data.itemInfo.id)]);
  };

  return (
    <>
      <Header type="back" />
      <Container>
        <CommonImage size="md" src={data.itemInfo.image} alt={data.itemInfo.name} />
        <ItemWrapper>
          <ItemContentsBox>
            <CommonText type="strongInfo" noOfLines={0}>
              {data.itemInfo.name}
            </CommonText>
          </ItemContentsBox>
          <ItemBox>
            <CommonText type="normalInfo">{formatNumber(data.itemInfo.price)}</CommonText>
            <Box>
              <CommonIcon type="fillStar" color="blue.300" />
              <CommonText type="smallInfo" noOfLines={0}>
                {data.itemAvgRate === null ? 0 : data.itemAvgRate} / 5
              </CommonText>
            </Box>
          </ItemBox>
        </ItemWrapper>
        <ButtonWrapper>
          <CommonButton type="mdSmall" onClick={handleItem} isDisabled={data.isMemberItem}>
            아이템 담기
          </CommonButton>
          <CommonButton type="link" src={data.itemUrl}>
            구매하러 가기
          </CommonButton>
        </ButtonWrapper>
        <CommonButton
          type="mdFull"
          isDisabled={isLogin === false}
          onClick={() =>
            isReviewed! > -1
              ? navigate(`/item/${itemId}/review/${reviewInfo.reviews[isReviewed!].reviewId}/edit`)
              : navigate(`/item/${itemId}/review/create`)
          }
        >
          {data.isReviewed ? '리뷰 수정' : '리뷰 작성'}
        </CommonButton>
      </Container>
      <div>
        <CommonDivider size="lg" />
        <CommentNumberWrapper>
          <CommonText type="normalInfo">총 {reviewInfo.totalCount}개의 리뷰</CommonText>
        </CommentNumberWrapper>
        <CommonDivider size="sm" />
      </div>
      <CommentsContainer>
        <>
          {reviewInfo.totalCount === 0 && <NoResult>등록된 리뷰가 없습니다.</NoResult>}
          {reviewInfo.reviews.map(
            ({ content, createdAt, memberInfo, reviewId, isReviewed, rate }) => (
              <Fragment key={reviewId}>
                <ItemComment
                  content={content}
                  createAt={createdAt}
                  memberInfo={memberInfo}
                  itemId={itemId!}
                  reviewId={reviewId}
                  isReviewed={isReviewed}
                  rate={rate}
                  editPath={`/item/${itemId}/review/${reviewId}/edit`}
                />
                <CommonDivider size="sm" />
              </Fragment>
            )
          )}
          {hasNextPage && <div ref={ref} style={{ height: '1rem' }} />}
        </>
      </CommentsContainer>
    </>
  );
};

export default ItemDetail;
