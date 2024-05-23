import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  CommonButton,
  CommonDrawer,
  CommonText,
  CommonTextarea,
  DividerImage,
  Header,
} from '@/shared/components';
import { useDrawer, useUserInfo } from '@/shared/hooks';
import {
  Container,
  ContentsWrapper,
  ContentsPanel,
  Form,
  ButtonWrapper,
  SelectedBucketBox,
} from './style';
import { FeedSelectBucket } from '@/features/feed/components';
import { useCreateFeed } from '@/features/feed/hooks';
import { HobbyRadio } from '@/features/hobby/components';

interface SelectedBucket {
  id: number;
  images: string[];
}

interface Textarea {
  textarea: string;
}

const FeedCreate = () => {
  const [selectedHobby, setSelectedHobby] = useState('');
  const [selectedBucket, setSelectedBucket] = useState<SelectedBucket | null>(null);

  const userInfo = useUserInfo();
  const createFeed = useCreateFeed();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<Textarea>({ mode: 'onBlur' });

  const onSubmit: SubmitHandler<Textarea> = (data) => {
    if (selectedBucket) {
      createFeed.mutate({ bucketId: selectedBucket.id, content: data.textarea });
    }
  };

  const { isOpen, onOpen, onClose } = useDrawer();

  return (
    <>
      <Header type="back" />
      <Container>
        <CommonText type="normalTitle">피드 생성하기</CommonText>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <ContentsWrapper>
            <ContentsPanel>
              <CommonText type="normalInfo">취미를 선택해주세요.</CommonText>
              <HobbyRadio onChange={setSelectedHobby} onClick={() => setSelectedBucket(null)} />
            </ContentsPanel>
            <ContentsPanel>
              <CommonText type="normalInfo">버킷을 선택해주세요.</CommonText>
              {selectedBucket ? (
                <SelectedBucketBox
                  onClick={() => {
                    onOpen();
                    setSelectedBucket(null);
                  }}
                >
                  <DividerImage images={selectedBucket.images} type="base" />
                </SelectedBucketBox>
              ) : (
                <CommonButton type="custom" onClick={onOpen} isDisabled={!selectedHobby} />
              )}
            </ContentsPanel>
            <ContentsPanel>
              <CommonText type="normalInfo">피드 내용을 입력해주세요.</CommonText>
              <CommonTextarea
                size="sm"
                placeholder="내용을 입력해주세요."
                error={errors.textarea}
                {...register('textarea', {
                  required: '내용을 필수로 입력해주세요.',
                  maxLength: {
                    value: 200,
                    message: '200글자 이하로 입력해주세요.',
                  },
                })}
              />
            </ContentsPanel>
          </ContentsWrapper>
          <ButtonWrapper>
            <CommonButton
              type="mdFull"
              isSubmit
              isDisabled={!selectedHobby || !isValid || isSubmitting || !selectedBucket}
            >
              생성 완료
            </CommonButton>
          </ButtonWrapper>
        </Form>
        <CommonDrawer
          isOpen={isOpen}
          onClose={() => {
            setSelectedBucket(null);
            onClose();
          }}
          onClickFooterButton={onClose}
          isFull={true}
          isDisabled={!selectedBucket}
          footerButtonText="선택 완료"
        >
          {userInfo && (
            <FeedSelectBucket
              hobby={selectedHobby}
              nickname={userInfo.nickname}
              selectedBucket={selectedBucket?.id || 0}
              onClick={setSelectedBucket}
            />
          )}
        </CommonDrawer>
      </Container>
    </>
  );
};

export default FeedCreate;
