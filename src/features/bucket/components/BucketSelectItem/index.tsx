import { useInfiniteQuery } from '@tanstack/react-query';
import { useIntersectionObserver } from '@/shared/hooks';
import { AddItem, Item } from '@/features/item/components';
import { itemQueryOption } from '@/features/item/service';

interface SelectedItem {
  id: number;
  src: string;
}

interface BucketSelectItemPorps {
  hobby: string;
  onClick: React.Dispatch<React.SetStateAction<SelectedItem[]>>;
  selectedItems: SelectedItem[];
}

const BucketSelectItem = ({ hobby, onClick, selectedItems }: BucketSelectItemPorps) => {
  const items = useInfiniteQuery({
    ...itemQueryOption.infinityList({ hobbyName: hobby, size: 12 }),
    select: ({ pages }) => ({
      pages,
      totalMemberItemCount: pages[0].totalMemberItemCount,
    }),
  });

  const observedRef = useIntersectionObserver({ onObserve: items.fetchNextPage });

  const handleClick = ({ id, src }: SelectedItem) => {
    onClick((prev) => {
      if (prev.map((item) => item.id).includes(id)) {
        return prev.filter((item) => item.id !== id);
      }

      return [...prev, { id, src }];
    });
  };

  const isBlur = (id: number) => {
    return selectedItems.some((item) => item.id === id);
  };

  if (items.isPending) {
    return;
  }

  if (items.isError) {
    return;
  }

  return (
    <>
      <Item>
        <Item.Header>아이템 선택</Item.Header>
        <Item.CountInfo count={items.data.totalMemberItemCount} />
        <Item.ImageContainer>
          {items.data.pages.map((page) =>
            page.summaries.map(({ itemInfo: { id, image, price, name } }) => (
              <Item.ImageBox key={id} isBlur={isBlur(id)}>
                <Item.ImageInput id={id} onChange={() => handleClick({ id, src: image })} />
                <Item.ImageInputLabel id={id}>
                  <Item.Image src={image} />
                </Item.ImageInputLabel>
                <Item.Price price={price} />
                <Item.Title name={name} />
              </Item.ImageBox>
            ))
          )}
          {items.hasNextPage && <div ref={observedRef} />}
        </Item.ImageContainer>
      </Item>
      {items.data.totalMemberItemCount === 0 && <AddItem />}
    </>
  );
};

export default BucketSelectItem;
