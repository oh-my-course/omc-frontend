import { Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { useIntersectionObserver } from '@/shared/hooks';
import { Item } from '@/features/item/components';
import { itemQueryOption } from '@/features/item/service';

interface ItemListProps {
  isDelete: boolean;
  deleteData: number[];
  setDeleteData: Dispatch<SetStateAction<number[]>>;
}

const ItemList = ({ isDelete, deleteData, setDeleteData }: ItemListProps) => {
  const navigate = useNavigate();

  const { data, hasNextPage, fetchNextPage } = useSuspenseInfiniteQuery({
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

  return (
    <Item>
      <Item.SubCountInfo>
        {isDelete ? `총 삭제할 아이템 ${deleteData.length}개` : `총 아이템 ${data.totalCount}개`}
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
  );
};

export default ItemList;
