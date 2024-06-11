import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { useIntersectionObserver } from '@/shared/hooks';
import { SelectedItem, inventoryQueryOption } from '../../service';
import { AddItem, Item } from '@/features/item/components';

interface InventorySelectItemProps {
  selectedItems: SelectedItem[];
  onChange: Dispatch<SetStateAction<SelectedItem[]>>;
  selectedHobby: string;
  inventoryId?: string;
}

const InventorySelectItem = ({
  onChange,
  selectedItems,
  selectedHobby,
  inventoryId,
}: InventorySelectItemProps) => {
  const { data: myItemsData, fetchNextPage } = useSuspenseInfiniteQuery({
    ...inventoryQueryOption.myItems({
      hobbyName: selectedHobby,
      inventoryId: Number(inventoryId),
      size: 12,
    }),
    select: (data) => data.pages.flatMap(({ reviewedItems }) => reviewedItems),
    staleTime: Infinity,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>, src: string) => {
    const checked = e.target.checked;
    checked
      ? onChange(() => [...selectedItems, { id: Number(e.target.id), src }])
      : onChange(selectedItems.filter(({ id }) => id !== Number(e.target.id)));
  };

  const ref = useIntersectionObserver({ onObserve: fetchNextPage });
  const isBlur = (id: number) => {
    return selectedItems.some((item) => item.id === id);
  };

  return (
    <>
      <Item>
        <Item.Header>인벤토리 아이템 선택</Item.Header>
        <Item.CountInfo count={myItemsData?.length || 0} />
        <Item.ImageContainer>
          {myItemsData.map(({ itemInfo: { id, image, price, name }, isSelected }) => (
            <Item.ImageBox key={id} isBlur={isBlur(id)}>
              <Item.ImageInput
                id={id}
                defaultChecked={isSelected}
                onChange={(e) => handleChange(e, image)}
              />
              <Item.ImageInputLabel id={id}>
                <Item.Image src={image} />
              </Item.ImageInputLabel>
              <Item.Price price={price} />
              <Item.Title name={name} limit={15} />
            </Item.ImageBox>
          ))}
        </Item.ImageContainer>
        <div ref={ref} />

        <AddItem />
      </Item>
    </>
  );
};

export default InventorySelectItem;
