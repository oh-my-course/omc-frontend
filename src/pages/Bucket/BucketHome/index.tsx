import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useSuspenseQuery } from '@tanstack/react-query';
import {
  CommonDivider,
  CommonIconButton,
  CommonTabs,
  CommonText,
  Header,
} from '@/shared/components';
import { useUserInfo } from '@/shared/hooks';
import { AddButtonWrapper, Container, ContentsWrapper, TitleWrapper } from './style';
import { BucketList } from '@/features/bucket/components';
import { hobbyQueryOption } from '@/features/hobby/service';

const BucketHome = () => {
  const { nickname } = useParams();
  const navigate = useNavigate();
  const userInfo = useUserInfo();
  const [searchParams, setSearchParams] = useSearchParams();
  const hobby = useSuspenseQuery({ ...hobbyQueryOption.all(), select: (data) => data.hobbies });

  const currentTabIndex = hobby.data
    ?.map(({ name }) => name)
    .indexOf(searchParams.get('hobby') || hobby.data[0].name);

  return (
    <>
      <Header type="back" path={`/member/${nickname}`} />
      <Container>
        <TitleWrapper>
          <CommonText type="normalTitle">버킷</CommonText>
        </TitleWrapper>
        <CommonDivider size="sm" />
        <CommonTabs
          currentTabIndex={currentTabIndex}
          paddingLeftRight={2}
          tabsType="soft-rounded"
          isFitted={false}
          onClick={(value) => {
            setSearchParams({ hobby: value });
          }}
          tabsData={hobby.data.map(({ name, value }) => ({
            value: name,
            label: value,
            content: (
              <ContentsWrapper>
                <BucketList nickname={nickname!} hobby={name} />
              </ContentsWrapper>
            ),
          }))}
        />
      </Container>
      {userInfo?.nickname === nickname && (
        <AddButtonWrapper>
          <CommonIconButton
            type="create"
            onClick={() => {
              navigate('/bucket/create');
            }}
          />
        </AddButtonWrapper>
      )}
    </>
  );
};

export default BucketHome;
