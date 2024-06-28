import { useNavigate, useParams } from 'react-router-dom';
import { useSuspenseQuery } from '@tanstack/react-query';
import { CommonIconButton, Header } from '@/shared/components';
import { useAuthNavigate } from '@/shared/hooks';
import { Storage } from '@/shared/utils';
import { AddButtonWrapper, Container, TextBox } from './style';
import { inventoryQueryOption } from '@/features/inventory/service';
import { Item } from '@/features/item/components';

const InventoryHome = () => {
  const authNavigate = useAuthNavigate();
  const navigate = useNavigate();
  const { nickname } = useParams();
  const { data: inventoryData } = useSuspenseQuery({
    ...inventoryQueryOption.list(nickname!),
    staleTime: Infinity,
  });
  const isOwner = nickname === Storage.getLocalStoraged('userInfo').nickname;

  return (
    <>
      <Header type="back" />
      <Container>
        <Item>
          <Item.Header>인벤토리</Item.Header>
          <Item.CountInfo count={inventoryData.inventoryInfos.length || 0} />
          <Item.ImageContainer>
            {inventoryData.inventoryInfos.map(
              ({ inventoryId, itemImages, hobby, inventoryTotalPrice }, index) => (
                <Item.ImageBox
                  key={index}
                  onClick={() => navigate(`/member/${nickname}/inventory/${inventoryId}`)}
                >
                  <Item.DividerImage images={itemImages} />
                  <TextBox>
                    <Item.Title name={hobby} />
                    <Item.Price price={inventoryTotalPrice} />
                  </TextBox>
                </Item.ImageBox>
              )
            )}
          </Item.ImageContainer>
        </Item>
      </Container>
      <AddButtonWrapper>
        {isOwner && (
          <CommonIconButton
            type="create"
            onClick={() => {
              authNavigate('/inventory/create');
            }}
          />
        )}
      </AddButtonWrapper>
    </>
  );
};
export default InventoryHome;
