import { useNavigate, useParams } from 'react-router-dom';
import { useSuspenseQuery } from '@tanstack/react-query';
import { CommonMenu, CommonText, Header } from '@/shared/components';
import { useDrawer } from '@/shared/hooks';
import { Storage } from '@/shared/utils';
import { Container, ContentWrapper, TitleWrapper } from './style';
import UpdateInventoryDetail from '@/features/inventory/components/ UpdateInventoryDetail';
import DeleteInventoryDetail from '@/features/inventory/components/DeleteInventoryDetail';
import { inventoryQueryOption } from '@/features/inventory/service';
import { Item } from '@/features/item/components';

const InventoryDetail = () => {
  const { nickname, inventoryId } = useParams() as { nickname: string; inventoryId: string };
  const numberInventoryId = Number(inventoryId);
  const { isOpen, onOpen, onClose } = useDrawer();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDrawer();
  const navigate = useNavigate();
  const isOwner = nickname === Storage.getLocalStoraged('userInfo').nickname;
  const { data: inventoryDetailData } = useSuspenseQuery({
    ...inventoryQueryOption.detail({
      nickname: nickname,
      inventoryId: numberInventoryId,
    }),
    staleTime: Infinity,
  });

  return (
    <>
      <Header type="back" />
      <Container>
        <Item>
          <TitleWrapper>
            <Item.Header>{inventoryDetailData.hobby} 인벤토리</Item.Header>
            {isOwner && (
              <CommonMenu
                type="update"
                iconSize="0.3rem"
                onDelete={onDeleteOpen}
                onUpdate={onOpen}
              />
            )}
          </TitleWrapper>
          <ContentWrapper>
            <CommonText type="smallTitle">아이템 전체보기</CommonText>
            <Item.CountInfo count={inventoryDetailData.itemCount || 0} />
          </ContentWrapper>
          <Item.ImageContainer>
            {inventoryDetailData.inventoryItemInfos.map(({ image, name, price, id }) => (
              <Item.ImageBox key={id} onClick={() => navigate(`/item/${id}`)}>
                <Item.Image src={image} />
                <Item.Title name={name} />
                <Item.Price price={price} />
              </Item.ImageBox>
            ))}
          </Item.ImageContainer>
        </Item>
      </Container>
      <UpdateInventoryDetail
        isOpen={isOpen}
        onClose={onClose}
        inventoryItemInfos={inventoryDetailData.inventoryItemInfos || []}
        inventoryHobby={inventoryDetailData.hobby || ''}
      />
      <DeleteInventoryDetail isOpen={isDeleteOpen} onClose={onDeleteClose} />
    </>
  );
};
export default InventoryDetail;
