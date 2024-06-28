import { useNavigate, useParams } from 'react-router-dom';
import { useSuspenseQuery } from '@tanstack/react-query';
import { CommonDrawer, CommonMenu, Header } from '@/shared/components';
import { useDrawer, useUserInfo } from '@/shared/hooks';
import { Container, TitlePanel, TitleWrapper } from './style';
import { useDeleteBucket } from '@/features/bucket/hooks';
import { bucketQueryOption } from '@/features/bucket/service';
import { hobbyQueryOption } from '@/features/hobby/service';
import { Item } from '@/features/item/components';

const BucketDetail = () => {
  const { nickname, bucketId } = useParams();
  const navigate = useNavigate();
  const userInfo = useUserInfo();

  const buckDetail = useSuspenseQuery(
    bucketQueryOption.detail({ nickname: nickname!, bucketId: Number(bucketId) })
  );

  const hobby = useSuspenseQuery({
    ...hobbyQueryOption.all(),
    select: (data) =>
      data.hobbies.reduce<Record<string, string>>(
        (acc, cur) => ((acc[cur.value] = cur.name), acc),
        {}
      ),
  });

  const { isOpen, onOpen, onClose } = useDrawer();
  const deleteBucket = useDeleteBucket();

  return (
    <>
      <Header type="back" title={buckDetail.data.name} />
      <Container>
        <Item>
          <TitleWrapper>
            <TitlePanel>
              <Item.Header>아이템 전체보기</Item.Header>
              <Item.CountInfo count={buckDetail.data.itemInfos.length || 0} />
            </TitlePanel>
            {userInfo?.nickname === nickname && (
              <CommonMenu
                type="update"
                iconSize="0.35rem"
                onDelete={onOpen}
                onUpdate={() => {
                  navigate(`/bucket/${bucketId}/edit?hobby=${hobby.data[buckDetail.data?.hobby]}`);
                }}
              />
            )}
          </TitleWrapper>

          <Item.ImageContainer>
            {buckDetail.data.itemInfos.map(({ id, image, name, price }) => (
              <Item.ImageBox key={id} onClick={() => navigate(`/item/${id}`)}>
                <Item.Image src={image} />
                <Item.Title name={name} />
                <Item.Price price={price} />
              </Item.ImageBox>
            ))}
          </Item.ImageContainer>
        </Item>
      </Container>
      <CommonDrawer
        isOpen={isOpen}
        onClose={onClose}
        isFull={false}
        isCloseButton={false}
        onClickFooterButton={() => {
          deleteBucket.mutate(Number(bucketId));
          navigate(`/member/${nickname}/bucket?hobby=${hobby.data[buckDetail.data?.hobby]}`, {
            replace: true,
          });
        }}
      >
        정말로 버킷을 삭제하시겠습니까?
      </CommonDrawer>
    </>
  );
};

export default BucketDetail;
