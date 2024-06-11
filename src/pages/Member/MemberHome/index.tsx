import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSuspenseQuery } from '@tanstack/react-query';
import {
  CommonAvatar,
  CommonBadge,
  CommonButton,
  CommonDivider,
  CommonDrawer,
  CommonIcon,
  CommonMenu,
  CommonText,
  DividerImage,
  Footer,
  Header,
} from '@/shared/components';
import { PROFILE_IMAGE_KEY } from '@/shared/constants';
import { useDrawer, useUserInfo } from '@/shared/hooks';
import { Storage } from '@/shared/utils';
import {
  Container,
  MemberInfoWrapper,
  MemberIntroWrapper,
  MemberInfoPanel,
  MemberInfoBox,
  ContentsWrapper,
  ContentsPanel,
  SubTitleBox,
  ImagePanel,
  Grid,
  IconBox,
  AddBox,
  ContentsContainer,
  ImageBox,
} from './style';
import { useLeave, useLogout } from '@/features/member/hooks';
import { memberQueryOption } from '@/features/member/service';

type Level = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

const MemberHome = () => {
  const { nickname } = useParams();
  const userInfo = useUserInfo();
  const isSelf = userInfo.nickname === nickname;

  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDrawer();
  const [selectedStatus, setSelectedStatus] = useState<'leave' | 'logout'>('logout');

  const member = useSuspenseQuery(memberQueryOption.detail(nickname!));
  const logout = useLogout();
  const leave = useLeave();

  useEffect(() => {
    window.addEventListener('beforeunload', () => {
      Storage.removeLocalStoraged(PROFILE_IMAGE_KEY);
    });
  }, []);

  const currentProfileImage =
    Storage.getLocalStoraged(PROFILE_IMAGE_KEY) || member.data.memberProfile.profileImage;

  return (
    <>
      <Header type="logo" />
      <Container>
        <MemberInfoWrapper>
          <MemberInfoPanel>
            <CommonAvatar size="5rem" src={currentProfileImage} />
            <MemberInfoBox>
              <CommonBadge type="level" levelNumber={member.data.memberProfile.level as Level} />
              <CommonText type="smallTitle">{nickname}</CommonText>
              {isSelf && (
                <CommonButton type="profile" onClick={() => navigate('/member/edit')}>
                  프로필 수정
                </CommonButton>
              )}
            </MemberInfoBox>
          </MemberInfoPanel>
          {isSelf && (
            <CommonMenu
              type="logout"
              iconSize="0.3rem"
              onLogout={() => {
                setSelectedStatus('logout');
                onOpen();
              }}
              onDelete={() => {
                setSelectedStatus('leave');
                onOpen();
              }}
            />
          )}
        </MemberInfoWrapper>
        <MemberIntroWrapper>
          <CommonText type="normalInfo" noOfLines={3}>
            {member.data.memberProfile.introduction}
          </CommonText>
        </MemberIntroWrapper>
        <CommonDivider size="lg" />
        <ContentsContainer>
          <ContentsWrapper onClick={() => navigate(`/member/${nickname}/inventory`)}>
            <ContentsPanel>
              <div>
                <SubTitleBox>
                  <CommonIcon type="inventory" />
                  <CommonText type="smallTitle">인벤토리</CommonText>
                </SubTitleBox>
                <CommonText type="smallInfo">
                  취미별 아이템을 조합하여 나만의 인벤토리를 만들 수 있어요
                </CommonText>
              </div>
              <IconBox>
                <CommonIcon type="chevronRight" size="0.8rem" />
              </IconBox>
            </ContentsPanel>
            {member.data.inventoryProfiles.length > 0 ? (
              <ImagePanel>
                <Grid>
                  {member.data.inventoryProfiles.map((inventory) => (
                    <ImageBox key={inventory.id}>
                      <DividerImage type="base" images={inventory.images} />
                      <CommonText type="smallInfo" weight={600}>
                        {inventory.hobby}
                      </CommonText>
                    </ImageBox>
                  ))}
                </Grid>
              </ImagePanel>
            ) : (
              isSelf && (
                <AddBox>
                  <CommonText type="smallInfo">보유하신 인벤토리가 없네요.</CommonText>
                  <CommonButton type="profile" onClick={() => navigate('/inventory/create')}>
                    인벤토리 추가하러가기
                  </CommonButton>
                </AddBox>
              )
            )}
          </ContentsWrapper>
          <CommonDivider size="sm" />
          <ContentsWrapper onClick={() => navigate(`/member/${nickname}/bucket`)}>
            <ContentsPanel>
              <div>
                <SubTitleBox>
                  <CommonIcon type="bucket" />
                  <CommonText type="smallTitle">버킷</CommonText>
                </SubTitleBox>
                <CommonText type="smallInfo">
                  취미별 아이템을 조합하여 나만의 버킷을 만들 수 있어요
                </CommonText>
              </div>
              <IconBox>
                <CommonIcon type="chevronRight" size="0.8rem" />
              </IconBox>
            </ContentsPanel>
            {member.data.bucketProfiles.length > 0 ? (
              <ImagePanel>
                <Grid>
                  {member.data?.bucketProfiles.map((bucket) => (
                    <ImageBox key={bucket.id}>
                      <DividerImage key={bucket.id} type="base" images={bucket.images} />
                      <CommonText type="smallInfo" weight={600}>
                        {bucket.hobby}
                      </CommonText>
                    </ImageBox>
                  ))}
                </Grid>
              </ImagePanel>
            ) : (
              isSelf && (
                <AddBox>
                  <CommonText type="smallInfo">보유하신 버킷이 없어요.</CommonText>
                  <CommonButton type="profile" onClick={() => navigate('/bucket/create')}>
                    버킷 추가하러가기
                  </CommonButton>
                </AddBox>
              )
            )}
          </ContentsWrapper>
          <CommonDivider size="sm" />
          <ContentsWrapper onClick={() => navigate(`/member/${nickname}/feed`)}>
            <ContentsPanel>
              <div>
                <SubTitleBox>
                  <CommonIcon type="feed" />
                  <CommonText type="smallTitle">피드</CommonText>
                </SubTitleBox>
                <CommonText type="smallInfo">
                  내가 올린 피드와 좋아요한 피드를 확인할 수 있어요
                </CommonText>
              </div>
              <IconBox>
                <CommonIcon type="chevronRight" size="0.8rem" />
              </IconBox>
            </ContentsPanel>
          </ContentsWrapper>
          <CommonDivider size="sm" />
        </ContentsContainer>
      </Container>
      <Footer />

      <CommonDrawer
        isOpen={isOpen}
        onClose={onClose}
        onClickFooterButton={() => {
          if (selectedStatus === 'logout') {
            logout();
          }

          if (selectedStatus === 'leave') {
            leave.mutate();
          }
        }}
        isFull={false}
        isCloseButton={false}
      >
        {selectedStatus === 'logout' ? '정말로 로그아웃하시겠습니까?' : '정말로 탈퇴하시겠습니까?'}
      </CommonDrawer>
    </>
  );
};

export default MemberHome;
