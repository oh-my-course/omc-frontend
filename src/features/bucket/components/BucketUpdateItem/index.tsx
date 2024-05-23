import { Item } from '@/features/item/components';
import { GetMyItemsResponse } from '@/features/item/service';

interface SelectedItem {
  id: number;
  image: string;
}

interface BucketUpdateItemProps {
  items: GetMyItemsResponse;
  selectedItems: number[];
  onClick: React.Dispatch<React.SetStateAction<SelectedItem[]>>;
}

const BucketUpdateItem = ({ items, selectedItems, onClick }: BucketUpdateItemProps) => {
  const handleClick = ({ id, image }: SelectedItem) => {
    onClick((prev) => {
      if (prev.map((item) => item.id).includes(id)) {
        return prev.filter((item) => item.id !== id);
      }

      return [...prev, { id, image }];
    });
  };

  return (
    <Item>
      <Item.Header>아이템 선택</Item.Header>
      <Item.CountInfo count={items.totalMemberItemCount} />
      <Item.ImageContainer>
        {items.summaries.map(({ itemInfo: { id, price, image, name } }) => (
          <Item.ImageBox key={id}>
            <Item.ImageInput
              id={id}
              onChange={() => handleClick({ id: id, image: image })}
              defaultChecked={selectedItems.includes(id)}
            />
            <Item.ImageInputLabel id={id}>
              <Item.Image src={image} />
            </Item.ImageInputLabel>
            <Item.Price price={price} />
            <Item.Title name={name} />
          </Item.ImageBox>
        ))}
      </Item.ImageContainer>
    </Item>
  );
};

export default BucketUpdateItem;
