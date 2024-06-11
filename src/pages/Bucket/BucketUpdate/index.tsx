import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useParams, useSearchParams } from 'react-router-dom';
import { useSuspenseQuery } from '@tanstack/react-query';
import { CommonButton, CommonDrawer, CommonInput, CommonText, Header } from '@/shared/components';
import { useDrawer, useUserInfo, useValidateForm } from '@/shared/hooks';
import { Container, ContentsPanel, ContentsWrapper, Form } from './style';
import { BucketSelectedItems, BucketUpdateItem } from '@/features/bucket/components';
import { useUpdateBucket } from '@/features/bucket/hooks';
import { bucketQueryOption } from '@/features/bucket/service';
import { HobbyRadio } from '@/features/hobby/components';
import { itemQueryOption } from '@/features/item/service';

interface SelectedItem {
  id: number;
  image: string;
}

interface BucketInfo {
  name: string;
  budget: number;
}

const BucketUpdate = () => {
  const userInfo = useUserInfo();
  const { bucketId } = useParams();
  const [searchParams] = useSearchParams();
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);
  const selectedItemIds = selectedItems.map(({ id }) => id);
  const updateBucket = useUpdateBucket();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<BucketInfo>({ mode: 'onBlur' });

  const bucket = useSuspenseQuery({
    ...bucketQueryOption.detail({ nickname: userInfo?.nickname || '', bucketId: Number(bucketId) }),
    select: (data) => {
      const items = data.itemInfos.reduce<SelectedItem[]>((acc, cur) => {
        return [...acc, { id: cur.id, image: cur.image }];
      }, []);

      return { hobby: data.hobby, items, id: data.bucketId, name: data.name, budget: data.budget };
    },
  });
  const registerOptions = useValidateForm();
  const onSubmit: SubmitHandler<BucketInfo> = (data) => {
    if (bucket.isSuccess && selectedItems.length > 0) {
      updateBucket.mutate({
        bucketId: bucket.data.id,
        hobbyValue: bucket.data.hobby,
        name: data.name,
        itemIds: selectedItemIds,
        budget: data.budget,
      });
    }
  };

  useEffect(() => {
    if (bucket.isSuccess) {
      setSelectedItems(bucket.data.items);
      setValue('name', bucket.data.name);
      setValue('budget', bucket.data.budget);
    }
  }, [bucket.data, bucket.isSuccess, setValue]);

  const items = useSuspenseQuery(
    itemQueryOption.myItems({ hobbyName: searchParams.get('hobby')! })
  );

  const { isOpen, onOpen, onClose } = useDrawer();

  return (
    <>
      <Header type="back" />
      <Container>
        <CommonText type="normalTitle">버킷 수정하기</CommonText>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <ContentsWrapper>
            <ContentsPanel>
              <CommonText type="normalInfo">버킷 이름</CommonText>
              <CommonInput
                placeholder="버킷 이름을 입력해주세요"
                type="text"
                width="full"
                error={errors.name}
                {...register('name', {
                  required: '버킷 이름은 필수입니다.',
                  maxLength: { value: 25, message: '최대 25자까지 허용됩니다.' },
                })}
              />
            </ContentsPanel>
            <ContentsPanel>
              <CommonText type="normalInfo">선택한 취미입니다.</CommonText>
              {bucket.isSuccess && <HobbyRadio defaultValue={bucket.data.hobby} isReadOnly />}
            </ContentsPanel>
            <ContentsPanel>
              <CommonText type="normalInfo">아이템을 하나 이상 선택해주세요.</CommonText>
              <div onClick={onOpen}>
                <BucketSelectedItems items={selectedItems} />
              </div>
            </ContentsPanel>
            <ContentsPanel>
              <CommonText type="normalInfo">본인의 예산을 입력해주세요. (선택)</CommonText>
              <CommonInput
                placeholder="예산을 입력해주세요."
                type="text"
                width="full"
                error={errors.budget}
                {...register('budget', ...registerOptions.budget)}
              />
            </ContentsPanel>
          </ContentsWrapper>
          <CommonButton type="mdFull" isDisabled={!selectedItems.length || isSubmitting} isSubmit>
            수정 완료
          </CommonButton>
        </Form>
        <CommonDrawer
          isOpen={isOpen}
          onClose={() => {
            setSelectedItems(bucket.data.items);
            onClose();
          }}
          onClickFooterButton={onClose}
          isFull
          footerButtonText="선택 완료"
          isDisabled={!selectedItems.length}
        >
          <BucketUpdateItem
            items={items.data}
            onClick={setSelectedItems}
            selectedItems={selectedItemIds}
          />
        </CommonDrawer>
      </Container>
    </>
  );
};

export default BucketUpdate;
