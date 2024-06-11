import { useSuspenseQuery } from '@tanstack/react-query';
import { CommonText } from '@/shared/components';
import { WrapperTitle, Grid, GridItemList, Item } from './style';
import { rankQueryOption } from '@/features/rank/service';

interface RankSearchProp {
  onInput: (word: string) => void;
}

const today = new Date().toLocaleDateString('ko-kr', {
  month: 'long',
  weekday: 'long',
  day: 'numeric',
});

const RankList = ({ onInput }: RankSearchProp) => {
  const { data } = useSuspenseQuery({ ...rankQueryOption.itemList() });

  const handleClick = (value: string) => {
    onInput(value);
  };

  return (
    <>
      <WrapperTitle>
        <CommonText type="normalInfo">인기 아이템</CommonText>
        <CommonText type="smallInfo">
          {today}
          기준
        </CommonText>
      </WrapperTitle>
      <Grid column={2}>
        {data.itemRanking.slice(0, 10).map(({ rank, itemName }) => (
          <GridItemList key={rank}>
            <Item onClick={() => handleClick(itemName)}>
              <CommonText type="smallInfo">{itemName}</CommonText>
            </Item>
          </GridItemList>
        ))}
      </Grid>
    </>
  );
};

export default RankList;
