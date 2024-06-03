import { useNavigate } from 'react-router-dom';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useIntersectionObserver } from '@/shared/hooks';
import { bucketQueryOption } from '../../service';
import { Container, NoResult } from './style';
import { Item } from '@/features/item/components';

interface BucketListProps {
  nickname: string;
  hobby: string;
}

const BucketList = ({ nickname, hobby }: BucketListProps) => {
  const navigate = useNavigate();

  const bucket = useInfiniteQuery(bucketQueryOption.list({ nickname, hobby, size: 18 }));

  const observedRef = useIntersectionObserver({ onObserve: bucket.fetchNextPage });

  if (bucket.isPending) {
    return;
  }

  if (bucket.isError) {
    return;
  }

  if (bucket.data.pages[0].buckets.length === 0) {
    return <NoResult>버킷이 없습니다.</NoResult>;
  }

  return (
    <Container>
      <Item>
        <Item.SubCountInfo>총 {bucket.data.pages[0].totalBucketCount}개의 버킷</Item.SubCountInfo>
        <Item.ImageContainer>
          {bucket.data.pages.map((page) =>
            page.buckets.map(({ bucketId, itemImages, name, totalPrice }, index) => (
              <Item.ImageBox key={index} onClick={() => navigate(`./${bucketId}`)}>
                <Item.DividerImage images={itemImages} />
                <Item.Title name={name} />
                <Item.Price price={totalPrice} />
              </Item.ImageBox>
            ))
          )}
          {bucket.hasNextPage && <div ref={observedRef} />}
        </Item.ImageContainer>
      </Item>
    </Container>
  );
};

export default BucketList;
