import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  CommonButton,
  CommonDrawer,
  CommonImage,
  CommonInput,
  CommonText,
  Header,
} from '@/shared/components';
import { useDrawer, useValidateForm } from '@/shared/hooks';
import {
  Box,
  ButtonWrapper,
  Container,
  Form,
  SelectedItemsBox,
  TitleWrapper,
  Wrapper,
} from './style';
import { BucketSelectItem } from '@/features/bucket/components';
import { useCreateBucket } from '@/features/bucket/hooks';
import { HobbySelector } from '@/features/hobby/components';

interface Hobby {
  english: string;
  hangul: string;
}

interface SelectedItem {
  id: number;
  src: string;
}

interface BucketInfo {
  name: string;
  budget: number;
}

const BucketCreate = () => {
  const [selectedHobby, setSelectedHobby] = useState<Hobby>({ english: '', hangul: '' });
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);
  const createBucket = useCreateBucket();
  const registerOptions = useValidateForm();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<BucketInfo>({ mode: 'onBlur' });
  const onSubmit: SubmitHandler<BucketInfo> = (data) => {
    if (selectedHobby) {
      createBucket.mutate({
        hobbyValue: selectedHobby.hangul,
        name: data.name,
        itemIds: selectedItems.map((item) => item.id),
        budget: data.budget,
      });
    }
  };

  const { isOpen, onOpen, onClose } = useDrawer();

  return (
    <>
      <Header type="back" />
      <Container>
        <TitleWrapper>
          <CommonText type="normalTitle" noOfLines={0}>
            새 버킷만들기
          </CommonText>
          <CommonText type="normalInfo" noOfLines={0}>
            버킷은 나의 아이템 중에서 하나이상을 선택해서 만들 수 있어요. 아이템은 직접 추가하거나
            아이템 담기를 통해 추가할 수 있어요.
          </CommonText>
        </TitleWrapper>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Wrapper>
            <Box>
              <CommonText type="normalInfo" noOfLines={1}>
                버킷 이름
              </CommonText>
              <CommonInput
                placeholder="버킷 이름을 입력해주세요."
                type="text"
                width="full"
                error={errors.name}
                {...register('name', {
                  required: '버킷 이름은 필수입니다.',
                  maxLength: { value: 25, message: '최대 25자까지 허용됩니다.' },
                })}
              />
            </Box>
            <Box>
              <CommonText type="normalInfo" noOfLines={0}>
                취미별로 버킷을 생성할 수 있어요. 취미를 선택해주세요!
              </CommonText>
              <HobbySelector onChange={setSelectedHobby} setSelectedItems={setSelectedItems} />
            </Box>

            <Box>
              <CommonText type="normalInfo" noOfLines={0}>
                아이템을 하나 이상 선택해주세요.
              </CommonText>
              <SelectedItemsBox>
                {selectedItems.length === 0 ? (
                  <CommonButton
                    type="custom"
                    isDisabled={!selectedHobby.english}
                    onClick={onOpen}
                  />
                ) : (
                  selectedItems.map(({ id, src }) => (
                    <CommonImage
                      key={id}
                      size="sm"
                      src={src}
                      onClick={() => {
                        onOpen();
                        setSelectedItems([]);
                      }}
                    />
                  ))
                )}
              </SelectedItemsBox>
            </Box>
            <Box>
              <CommonText type="normalInfo" noOfLines={0}>
                본인의 예산을 입력해주세요. (선택)
              </CommonText>
              <CommonInput
                placeholder="예산을 입력해주세요."
                type="text"
                width="full"
                error={errors.budget}
                {...register('budget', ...registerOptions.budget)}
              />
            </Box>
          </Wrapper>
          <ButtonWrapper>
            <CommonButton
              type="mdFull"
              isDisabled={
                !selectedHobby.english.length || !selectedItems.length || !isValid || isSubmitting
              }
              isSubmit={true}
            >
              생성 완료
            </CommonButton>
          </ButtonWrapper>
        </Form>

        <CommonDrawer
          isOpen={isOpen}
          onClose={() => {
            setSelectedItems([]);
            onClose();
          }}
          onClickFooterButton={() => {
            onClose();
          }}
          isDisabled={selectedItems.length < 1}
          isFull={true}
          footerButtonText="선택 완료"
        >
          <BucketSelectItem
            hobby={selectedHobby.english}
            onClick={setSelectedItems}
            selectedItems={selectedItems}
          />
        </CommonDrawer>
      </Container>
    </>
  );
};

export default BucketCreate;
