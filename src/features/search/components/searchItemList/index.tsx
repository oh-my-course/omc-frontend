import { useNavigate } from 'react-router-dom';
import { Grid, GridItem } from '@chakra-ui/react';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import {
  CommonButton,
  CommonDivider,
  CommonIcon,
  CommonImage,
  CommonText,
} from '@/shared/components';
import { useAuthNavigate, useIntersectionObserver } from '@/shared/hooks';
import { formatNumber } from '@/shared/utils';
import { Wrapper, Box, TextBox, NoResult } from './style';
import { searchQueryOption } from '@/features/search/service';
import { SearchListProps } from '@/pages/Search/SearchMain';

export interface SearchListItemProp {
  keyword: SearchListProps['keyword'];
}

const SearchItemList = ({ keyword }: SearchListItemProp) => {
  const { data, hasNextPage, fetchNextPage } = useSuspenseInfiniteQuery({
    ...searchQueryOption.infiniteKeywordItemList({
      keyword: encodeURIComponent(keyword),
      size: 12,
    }),
    select: (data) => {
      return {
        totalCount: data.pages.flatMap(({ itemTotalCount }) => itemTotalCount),
        items: data.pages.flatMap(({ items }) => items),
      };
    },
  });

  const ref = useIntersectionObserver({ onObserve: fetchNextPage });

  const navigate = useNavigate();

  const authNavigate = useAuthNavigate();

  if (data.totalCount[0] === 0) {
    return <NoResult>검색결과가 없습니다.</NoResult>;
  }

  return (
    <>
      <Box>
        <TextBox>
          <CommonText type="subStrongInfo">총 {data.totalCount[0]}개의 아이템</CommonText>
        </TextBox>
        <Grid padding="0 1rem" templateColumns="repeat(3,1fr)" gap="0.25rem">
          {data.items.map(({ itemSummary }) => (
            <GridItem key={itemSummary.id} onClick={() => navigate(`/item/${itemSummary.id}`)}>
              <CommonImage size="sm" src={itemSummary.image} />
              <CommonText type="normalInfo">{formatNumber(itemSummary.price)}</CommonText>
              <CommonText type="smallInfo">{itemSummary.name}</CommonText>
            </GridItem>
          ))}
          {hasNextPage && <div ref={ref} />}
        </Grid>
        <CommonDivider size="sm" />
        <div>
          <CommonText type="smallInfo">원하시는 아이템이 없나요?</CommonText>
          <Wrapper onClick={() => authNavigate('/item/create')}>
            <CommonButton type="text">아이템 추가하러가기</CommonButton>
            <CommonIcon type="chevronRight" />
          </Wrapper>
        </div>
      </Box>
    </>
  );
};

export default SearchItemList;
