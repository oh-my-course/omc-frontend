import { useSearchParams } from 'react-router-dom';
import { useSuspenseQuery } from '@tanstack/react-query';
import { CommonDivider, CommonSelect, CommonTabs } from '@/shared/components';
import { Container, SelectWrapper } from './style';
import { FeedHomeList } from '@/features/feed/components';
import { hobbyQueryOption } from '@/features/hobby/service';

const FeedHome = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const hobbies = useSuspenseQuery({ ...hobbyQueryOption.all(), select: ({ hobbies }) => hobbies });

  const currentTabIndex = hobbies.data
    .map(({ name }) => name)
    .indexOf(searchParams.get('hobby') || hobbies.data[0].name);

  return (
    <CommonTabs
      currentTabIndex={currentTabIndex}
      tabsType="soft-rounded"
      isFitted={false}
      onClick={(value) => {
        setSearchParams({ hobby: value });
      }}
      tabsData={hobbies.data.map(({ name, value }) => ({
        value: name,
        label: value,
        content: (
          <Container>
            <SelectWrapper>
              <CommonSelect
                selectedValue={searchParams.get('sort') || 'recent'}
                onChange={(e) => {
                  const sort = e.target.value;

                  setSearchParams({
                    hobby: searchParams.get('hobby') || '',
                    sort: sort,
                  });
                }}
              />
            </SelectWrapper>
            <CommonDivider size="sm" />
            <FeedHomeList
              hobbyName={searchParams.get('hobby') || hobbies.data[0].name}
              sortCondition={searchParams.get('sort') || 'recent'}
            />
          </Container>
        ),
      }))}
    />
  );
};

export default FeedHome;
