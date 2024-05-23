import { ChangeEvent, ReactNode } from 'react';
import { CommonImage, CommonText, DividerImage } from '@/shared/components';
import type { ItemImage as ItemImages } from '@/shared/types';
import { ellipsisName, formatNumber } from '@/shared/utils';
import { BlurItem, Container, Grid, GridItem, ImageInput, ImageLabel } from './style';

interface ItemCountInfo {
  count: number;
}

interface ItemImageInputType {
  id: number;
  defaultChecked?: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

interface ItemImageBoxType {
  children: ChildrenType['children'];
  onClick?: () => void;
  isDelete?: boolean;
  isDeleteMode?: boolean;
}

interface ItemDividerImageType {
  images: ItemImages[];
}

type ItemImageLabelType = Pick<ItemImageInputType, 'id'> & Pick<ChildrenType, 'children'>;

interface ItemImageType {
  src: string;
}

interface ItemPriceType {
  price: number;
}
interface ItemTitleType {
  name: string;
  limit?: number;
}

interface ChildrenType {
  children: ReactNode;
}

const ItemContainer = ({ children }: ChildrenType) => {
  return <Container>{children}</Container>;
};

const ItemHeader = ({ children }: ChildrenType) => {
  return <CommonText type="normalTitle">{children}</CommonText>;
};

const ItemSubCountInfo = ({ children }: ChildrenType) => {
  return <CommonText type="smallInfo">{children}</CommonText>;
};

const ItemCountInfo = ({ count }: ItemCountInfo) => {
  return <CommonText type="subStrongInfo">{count}개의 아이템</CommonText>;
};

const ItemImageContainer = ({ children }: ChildrenType) => {
  return <Grid>{children}</Grid>;
};

const ItemImageBox = ({ children, onClick, isDelete, isDeleteMode }: ItemImageBoxType) => {
  return (
    <BlurItem isDelete={isDelete} isDeleteMode={isDeleteMode}>
      <GridItem onClick={onClick}>{children}</GridItem>
    </BlurItem>
  );
};

const ItemDividerImage = ({ images }: ItemDividerImageType) => {
  const filterImage = images.map(({ imgUrl }) => imgUrl);

  return <DividerImage type="base" images={filterImage} />;
};

const ItemImageInput = ({ id, defaultChecked, onChange }: ItemImageInputType) => {
  return (
    <ImageInput
      type="checkbox"
      id={String(id)}
      defaultChecked={defaultChecked}
      onChange={onChange}
    />
  );
};

const ItemImageInputLabel = ({ id, children }: ItemImageLabelType) => {
  return <ImageLabel htmlFor={String(id)}>{children}</ImageLabel>;
};

const ItemImage = ({ src }: ItemImageType) => {
  return <CommonImage size="sm" src={src} />;
};

const ItemPrice = ({ price }: ItemPriceType) => {
  return <CommonText type="normalInfo">{formatNumber(price)}</CommonText>;
};

const ItemTitle = ({ name, limit = 15 }: ItemTitleType) => {
  return <CommonText type="smallInfo">{ellipsisName(name, limit)}</CommonText>;
};

const Item = Object.assign(ItemContainer, {
  Header: ItemHeader,
  SubCountInfo: ItemSubCountInfo,
  CountInfo: ItemCountInfo,
  ImageContainer: ItemImageContainer,
  ImageBox: ItemImageBox,
  ImageInput: ItemImageInput,
  ImageInputLabel: ItemImageInputLabel,
  Image: ItemImage,
  DividerImage: ItemDividerImage,
  Price: ItemPrice,
  Title: ItemTitle,
});

export default Item;
