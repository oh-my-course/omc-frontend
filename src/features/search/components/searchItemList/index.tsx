import { useNavigate } from 'react-router-dom';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { useIntersectionObserver } from '@/shared/hooks';
import { NoResult } from './style';
import { AddItem, Item } from '@/features/item/components';
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

  if (data.totalCount[0] === 0) {
    return <NoResult>검색결과가 없습니다.</NoResult>;
  }

  return (
    <Item>
      <Item.CountInfo count={data.totalCount[0]} />
      <Item.ImageContainer>
        {data.items.map(({ itemSummary: { id, image, price, name } }) => (
          <Item.ImageBox key={id} onClick={() => navigate(`/item/${id}`)}>
            <Item.Image src={image} />
            <Item.Price price={price} />
            <Item.Title name={name} />
          </Item.ImageBox>
        ))}
        {hasNextPage && <div ref={ref} />}
      </Item.ImageContainer>

      <AddItem />
    </Item>
  );
};

export default SearchItemList;
