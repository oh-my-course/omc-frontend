import { Suspense, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CommonTabs } from '@/shared/components';
import { Container } from './style';
import { useHobby } from '@/features/hobby/hooks';
import { VoteInProgress, Votes } from '@/features/vote/components';

const VoteHome = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const getHobby = searchParams.get('hobby');

  const { data: hobbyData, isSuccess: hobbySuccess } = useHobby();

  useEffect(() => {
    if (!searchParams.get('hobby') && hobbySuccess) {
      setSearchParams({ hobby: hobbyData.hobbies[0].name });
    }
  }, [hobbyData?.hobbies, hobbySuccess, searchParams, setSearchParams]);

  const currentTabIndex = hobbyData?.hobbies
    .map(({ name }) => name)
    .indexOf(getHobby || hobbyData.hobbies[0].name);

  return (
    <Container>
      <Suspense fallback={<>Loading...</>}>
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
      </Suspense>
    </Container>
  );
};

export default VoteHome;
