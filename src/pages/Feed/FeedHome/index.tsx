import { useLoaderData, useSearchParams } from 'react-router-dom';
import { CommonDivider, CommonSelect, CommonTabs } from '@/shared/components';
import { Container, SelectWrapper } from './style';
import { FeedHomeList } from '@/features/feed/components';
import { useHobby } from '@/features/hobby/hooks';
import { ParamsInfo } from '@/features/vote/service';

const FeedHome = () => {
  const {
    paramsInfo: { getHobby, getSort },
  } = useLoaderData() as ParamsInfo;
  const [, setSearchParams] = useSearchParams();

  const { data: hobbyData } = useHobby();

  const currentTabIndex = hobbyData.hobbies.map(({ name }) => name).indexOf(getHobby);

  return (
    <CommonTabs
      currentTabIndex={currentTabIndex}
      tabsType="soft-rounded"
      isFitted={false}
      onClick={(value) => {
        setSearchParams({ hobby: value });
      }}
      tabsData={hobbyData.hobbies.map(({ name, value }) => ({
        value: name,
        label: value,
        content: (
          <Container>
            <SelectWrapper>
              <CommonSelect
                selectedValue={getSort}
                onChange={(e) => {
                  const sort = e.target.value;

                  setSearchParams({
                    hobby: getHobby,
                    sort: sort,
                  });
                }}
              />
            </SelectWrapper>
            <CommonDivider size="sm" />
            <FeedHomeList hobbyName={getHobby} sortCondition={getSort!} />
          </Container>
        ),
      }))}
    />
  );
};

export default FeedHome;
