import { CommonButton, CommonDivider, CommonIcon, CommonText } from '@/shared/components';
import { useAuthNavigate } from '@/shared/hooks';
import { Wrapper } from './style';

const AddItem = () => {
  const authNavigate = useAuthNavigate();

  return (
    <>
      <CommonDivider size="sm" />
      <section>
        <CommonText type="smallInfo">원하시는 아이템이 없나요?</CommonText>
        <Wrapper>
          <CommonButton type="text" onClick={() => authNavigate('/item/create')}>
            아이템 추가하러가기
          </CommonButton>
          <CommonIcon type="chevronRight" />
        </Wrapper>
      </section>
    </>
  );
};

export default AddItem;
