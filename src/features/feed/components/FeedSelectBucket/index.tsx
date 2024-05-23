import { useNavigate } from 'react-router-dom';
import { useInfiniteQuery } from '@tanstack/react-query';
import { CommonButton, CommonDivider, CommonIcon, CommonText } from '@/shared/components';
import { useIntersectionObserver } from '@/shared/hooks';
import { AddBucketButtonBox, AddBucketWrapper } from './style';
import { bucketQueryOption } from '@/features/bucket/service';
import { Item } from '@/features/item/components';

interface SelectedBucket {
  id: number;
  images: string[];
}

interface FeedSelectBucketProps {
  hobby: string;
  nickname: string;
  selectedBucket: number;
  onClick: React.Dispatch<React.SetStateAction<SelectedBucket | null>>;
}

interface ItemImages {
  id: number;
  imgUrl: string;
}

const reduceImgUrl = (itemImages: ItemImages[]) => {
  return itemImages.reduce<string[]>((acc, cur) => [...acc, cur.imgUrl], []);
};

const FeedSelectBucket = ({ hobby, nickname, selectedBucket, onClick }: FeedSelectBucketProps) => {
  const navigate = useNavigate();

  const bucketList = useInfiniteQuery(bucketQueryOption.list({ hobby, nickname, size: 18 }));

  const observedRef = useIntersectionObserver({ onObserve: bucketList.fetchNextPage });

  const isBlur = (id: number) => {
    return selectedBucket === id;
  };

  if (bucketList.isPending) {
    return;
  }

  if (bucketList.isError) {
    return;
  }

  if (bucketList.data.pages[0].buckets.length === 0) {
    return (
      <>
        <CommonDivider size="sm" />
        <AddBucketWrapper>
          <CommonText type="smallInfo">취미에 맞는 버킷이 없습니다!</CommonText>
          <AddBucketButtonBox onClick={() => navigate('/bucket/create')}>
            <CommonButton type="text">버킷 추가하러 가기</CommonButton>
            <CommonIcon type="chevronRight" />
          </AddBucketButtonBox>
        </AddBucketWrapper>
      </>
    );
  }

  return (
    <Item>
      <Item.Header>버킷 선택하기</Item.Header>
      <Item.SubCountInfo>총 {bucketList.data.pages[0].totalBucketCount}개의 버킷</Item.SubCountInfo>
      <Item.ImageContainer>
        {bucketList.data.pages.map((page) =>
          page.buckets.map(({ bucketId, itemImages, name }) => (
            <Item.ImageBox key={bucketId} isBlur={isBlur(bucketId)}>
              <Item.ImageInput
                id={bucketId}
                onChange={() => {
                  if (selectedBucket === bucketId) {
                    onClick(null);
                  } else {
                    onClick({ id: bucketId, images: reduceImgUrl(itemImages) });
                  }
                }}
                defaultChecked={selectedBucket === bucketId}
              />
              <Item.ImageInputLabel id={bucketId}>
                <Item.DividerImage images={itemImages} />
              </Item.ImageInputLabel>
              <Item.Title name={name} />
            </Item.ImageBox>
          ))
        )}
        {bucketList.hasNextPage && <div ref={observedRef} />}
      </Item.ImageContainer>
    </Item>
  );
};

export default FeedSelectBucket;
