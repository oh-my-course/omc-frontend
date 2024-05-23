import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInfiniteQuery } from '@tanstack/react-query';
import { CommonIconButton, CommonText, Header, Footer, CommonSpinner } from '@/shared/components';
import { useAuthNavigate, useIntersectionObserver } from '@/shared/hooks';
import { Container, TitleContainer, AddContainer, ButtonBox, NoResult } from './style';
import { Item } from '@/features/item/components';
import { useDeleteItem } from '@/features/item/hooks';
import { itemQueryOption } from '@/features/item/service';

const ItemList = () => {
  const navigate = useNavigate();

  const [deleteData, setDeleteData] = useState<number[]>([]);

  const [isDelete, setIsDelete] = useState<boolean>(false);

  const authNavigate = useAuthNavigate();

  const {
    mutate: itemMutate,
    isError: itemDeleteError,
    isPending: itemDeletePending,
  } = useDeleteItem({ cursorId: '', size: 3 });

  const { data, hasNextPage, fetchNextPage, isPending, isError } = useInfiniteQuery({
    ...itemQueryOption.infinityList({ size: 13 }),
    select: (data) => {
      return {
        summaries: data.pages.flatMap(({ summaries }) => summaries),
        totalCount: data.pages[0].totalMemberItemCount,
      };
    },
  });

  const ref = useIntersectionObserver({ onObserve: fetchNextPage });

  const handleImageClick = (id: number) => {
    if (isDelete) {
      return;
    }
    navigate(`/item/${id}`);
  };

  const handleChange = (deleteId: number) => {
    if (!deleteData.includes(deleteId)) {
      setDeleteData((prev) => [...prev, deleteId]);
    } else {
      setDeleteData((prev) => [...prev.filter((id) => id !== deleteId)]);
    }
  };

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

  if (isPending || itemDeletePending) {
    return (
      <NoResult>
        <CommonSpinner size="xl" />
      </NoResult>
    );
  }

  if (isError || itemDeleteError) {
    return <NoResult>Error...</NoResult>;
  }

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
        <Item>
          <Item.SubCountInfo>
            {isDelete
              ? `총 삭제할 아이템 ${deleteData.length}개`
              : `총 아이템 ${data.totalCount}개`}
          </Item.SubCountInfo>
          <Item.ImageContainer>
            {data.summaries.map(({ itemInfo: { id, image, name, price } }) => (
              <Item.ImageBox key={id} isBlur={deleteData.includes(id)}>
                <Item.ImageInput
                  id={id}
                  onChange={isDelete ? () => handleChange(id) : () => handleImageClick(id)}
                />
                <Item.ImageInputLabel id={id}>
                  <Item.Image src={image} />
                </Item.ImageInputLabel>
                <Item.Price price={price} />
                <Item.Title name={name} limit={20} />
              </Item.ImageBox>
            ))}
            {hasNextPage && <div ref={ref} />}
          </Item.ImageContainer>
        </Item>
      </Container>
      <Footer>
        <AddContainer>
          <CommonIconButton type="add" onClick={() => authNavigate('create')} />
        </AddContainer>
      </Footer>
    </>
  );
};

export default ItemList;
