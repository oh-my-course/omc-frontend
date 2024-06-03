import { useLoaderData, useSearchParams } from 'react-router-dom';
import { CommonTabs } from '@/shared/components';
import { Container } from './style';
import { useHobby } from '@/features/hobby/hooks';
import { VoteInProgress, Votes } from '@/features/vote/components';
import { ParamsInfo } from '@/features/vote/service';

const VoteHome = () => {
  const {
    paramsInfo: { getHobby },
  } = useLoaderData() as ParamsInfo;
  const [, setSearchParams] = useSearchParams();

  const { data: hobbyData } = useHobby();

  const currentTabIndex = hobbyData?.hobbies
    .map(({ name }) => name)
    .indexOf(getHobby || hobbyData.hobbies[0].name);

  return (
    <Container>
      <CommonTabs
        currentTabIndex={currentTabIndex}
        tabsType="soft-rounded"
        isFitted={false}
        onClick={(value) => {
          setSearchParams({ hobby: value });
        }}
        tabsData={
          hobbyData?.hobbies.map(({ name, value }) => ({
            value: name,
            label: value,
            content: (
              <>
                <VoteInProgress />
                <Votes />
              </>
            ),
          })) || []
        }
      />
    </Container>
  );
};

export default VoteHome;
