import styled from '@emotion/styled';
import {
  CommonButton,
  CommonDivider,
  CommonIcon,
  CommonImage,
  CommonText,
} from '@/shared/components';
import { formatNumber } from '@/shared/utils';
import { Body, Container } from './style';
import { GetMyItemsResponse } from '@/features/item/service';

interface SelectedItem {
  id: number;
  image: string;
}

interface BucketSelectItemPorps {
  items: GetMyItemsResponse;
  selectedItems: number[];
  onClick: React.Dispatch<React.SetStateAction<SelectedItem[]>>;
}

const BucketSelectItem = ({ items, selectedItems, onClick }: BucketSelectItemPorps) => {
  const handleClick = ({ id, image }: SelectedItem) => {
    onClick((prev) => {
      if (prev.map((item) => item.id).includes(id)) {
        return prev.filter((item) => item.id !== id);
      }

      return [...prev, { id, image }];
    });
  };

  return (
    <>
      <Body>
        <CommonText type="normalTitle">아이템 선택</CommonText>
        <CommonText type="subStrongInfo">총 {items.totalCount}개의 아이템</CommonText>
        <ItemsWrapper>
          {items.summaries.map(({ itemInfo }) => (
            <ItemBox
              key={itemInfo.id}
              style={{ border: selectedItems.includes(itemInfo.id) ? '1px solid' : undefined }}
            >
              <CommonImage
                size="sm"
                src={itemInfo.image}
                onClick={() => handleClick({ id: itemInfo.id, image: itemInfo.image })}
              />
              <CommonText type="normalInfo">{formatNumber(itemInfo.price)}원</CommonText>
              <CommonText type="smallInfo">{itemInfo.name}</CommonText>
            </ItemBox>
          ))}
        </ItemsWrapper>
        <CommonDivider size="sm" />
        <div>
          <CommonText type="smallInfo">원하시는 아이템이 없나요?</CommonText>
          <Container>
            <CommonButton type="text">아이템 추가하러가기</CommonButton>
            <CommonIcon type="chevronRight" />
          </Container>
        </div>
      </Body>
    </>
  );
};

export default BucketSelectItem;

const ItemsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
`;

const ItemBox = styled.div`
  margin-bottom: 1rem;
`;
