import { SubmitHandler, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useSuspenseQuery } from '@tanstack/react-query';
import {
  CommonButton,
  CommonText,
  CommonTextarea,
  DividerImage,
  Header,
} from '@/shared/components';
import {
  ButtonWrapper,
  Container,
  ContentsPanel,
  ContentsWrapper,
  Form,
  SelectedBucketBox,
} from './style';
import { useUpdateFeed } from '@/features/feed/hooks';
import { feedQueryOption } from '@/features/feed/service';
import { HobbyRadio } from '@/features/hobby/components';

interface FeedContent {
  content: string;
}

const FeedUpdate = () => {
  const { feedId } = useParams();
  const feedDetail = useSuspenseQuery({
    ...feedQueryOption.detail(Number(feedId)),
    select: (data) => {
      const hobby = data.feedInfo.hobby;
      const images = data.feedItems.map(({ image }) => image);
      const content = data.feedInfo.content;

      return { hobby, images, content };
    },
  });
  const updateFeed = useUpdateFeed(feedId!);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FeedContent>({
    mode: 'onBlur',
    values: { content: feedDetail.data?.content || '' },
  });

  const onSubmit: SubmitHandler<FeedContent> = ({ content }) => {
    updateFeed.mutate({ feedId: Number(feedId), content });
  };

  return (
    <>
      <Header type="back" />
      <Container>
        <CommonText type="normalTitle">피드 수정하기</CommonText>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <ContentsWrapper>
            <ContentsPanel>
              <CommonText type="normalInfo">선택한 취미입니다.</CommonText>
              <HobbyRadio defaultValue={feedDetail.data.hobby} isReadOnly />
            </ContentsPanel>
            <ContentsPanel>
              <CommonText type="normalInfo">선택한 버킷입니다.</CommonText>
              <SelectedBucketBox>
                <DividerImage images={feedDetail.data.images} type="base" />
              </SelectedBucketBox>
            </ContentsPanel>
            <ContentsPanel>
              <CommonText type="normalInfo">피드 내용을 입력해주세요.</CommonText>
              <CommonTextarea
                size="sm"
                placeholder="내용을 입력해주세요."
                error={errors.content}
                {...register('content', {
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
            <CommonButton type="mdFull" isSubmit>
              수정 완료
            </CommonButton>
          </ButtonWrapper>
        </Form>
      </Container>
    </>
  );
};

export default FeedUpdate;
