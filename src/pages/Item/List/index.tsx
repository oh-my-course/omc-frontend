import { useState } from 'react';
import {
  CommonIconButton,
  CommonText,
  Header,
  Footer,
  SuspenseBoundary,
  Skeleton,
} from '@/shared/components';
import { useAuthNavigate } from '@/shared/hooks';
import { Container, TitleContainer, AddContainer, ButtonBox } from './style';
import { ItemList } from '@/features/item/components';
import { useDeleteItem } from '@/features/item/hooks';

const Item = () => {
  const [deleteData, setDeleteData] = useState<number[]>([]);

  const [isDelete, setIsDelete] = useState<boolean>(false);

  const authNavigate = useAuthNavigate();

  const { mutate: itemMutate } = useDeleteItem({ cursorId: '', size: 3 });

  const handleClick = () => {
    setDeleteData([]);
    setIsDelete((prev) => !prev);
  };

  const handleDeleteClick = () => {
    if (deleteData.length !== 0) {
      itemMutate({ itemIds: deleteData.join(',') });
    }
    handleClick();
  };

  return (
    <>
      <Header type="logo" />
      <Container>
        <TitleContainer>
          <CommonText type="smallTitle">내 아이템{isDelete ? ' 삭제하기' : ' 전체보기'}</CommonText>
          {isDelete ? (
            <ButtonBox>
              <CommonIconButton type="cancel" onClick={handleClick} />
              <CommonIconButton type="delete" onClick={handleDeleteClick} />
            </ButtonBox>
          ) : (
            <CommonIconButton type="delete" onClick={() => setIsDelete((prev) => !prev)} />
          )}
        </TitleContainer>
        <SuspenseBoundary
          suspenseFallback={
            <Skeleton>
              <Skeleton.TextWrapper>
                <Skeleton.Text />
              </Skeleton.TextWrapper>
              <Skeleton.GridWrapper column={3} rows={4}>
                <Skeleton.GridItem count={11}>
                  <Skeleton.Item />
                </Skeleton.GridItem>
              </Skeleton.GridWrapper>
            </Skeleton>
          }
        >
          <ItemList isDelete={isDelete} deleteData={deleteData} setDeleteData={setDeleteData} />
        </SuspenseBoundary>
      </Container>
      <Footer>
        <AddContainer>
          <CommonIconButton type="add" onClick={() => authNavigate('create')} />
        </AddContainer>
      </Footer>
    </>
  );
};

export default Item;
