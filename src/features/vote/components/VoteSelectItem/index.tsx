import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { useIntersectionObserver } from '@/shared/hooks';
import { SelectedItem } from '@/features/inventory/service';
import { AddItem, Item } from '@/features/item/components';
import { itemQueryOption } from '@/features/item/service';

interface VoteSelectItemProps {
  selectedItems: SelectedItem[];
  onChange: Dispatch<SetStateAction<SelectedItem[]>>;
  selectedHobby: string;
}

const VoteSelectItem = ({ selectedItems, onChange, selectedHobby }: VoteSelectItemProps) => {
  const { data: myItemsData, fetchNextPage } = useSuspenseInfiniteQuery({
    ...itemQueryOption.infinityList({
      hobbyName: selectedHobby,
      size: 12,
    }),
    select: (data) => {
      return {
        totalMemberItemCount: data?.pages[0].totalMemberItemCount,
        summaries: data?.pages.flatMap(({ summaries }) => summaries),
      };
    },
    staleTime: Infinity,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>, src: string) => {
    // 체크 여부에 따라 분기 처리
    const checked = e.target.checked;
    if (checked && selectedItems.length <= 1) {
      onChange((prev) => [...prev, { id: Number(e.target.id), src: src }]);
    } else if (!checked) {
      onChange(selectedItems.filter(({ id }) => id !== Number(e.target.id)));
    }
    if (selectedItems.length > 1) {
      e.target.checked = false;
    }
  };

  const ref = useIntersectionObserver({ onObserve: fetchNextPage });

  const isBlur = (id: number) => {
    return selectedItems.some((item) => item.id === id);
  };

  return (
    <Item>
      <Item.Header>인벤토리 아이템 선택</Item.Header>
      <Item.CountInfo count={myItemsData?.summaries.length || 0} />
      <Item.ImageContainer>
        {myItemsData.summaries.map(({ itemInfo: { id, image, price, name } }) => (
          <Item.ImageBox key={id} isBlur={isBlur(id)}>
            <Item.ImageInput id={id} onChange={(e) => handleChange(e, image)} />
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
  );
};

export default VoteSelectItem;
