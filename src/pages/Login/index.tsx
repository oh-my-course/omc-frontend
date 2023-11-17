import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { CommonButton, CommonIcon, CommonInput } from '@/shared/components';
import { useValidateForm } from '@/shared/hooks';
import { ButtonWrapper, Container, Form, IconWrapper, InputWrapper } from './style';
import { useLogin } from '@/features/member/hooks';
import { PostLoginRequest } from '@/features/member/service';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostLoginRequest>();
  const [showPassword, setShowPassword] = useState(false);
  const { mutate: loginMutate } = useLogin();
  const registerOptions = useValidateForm();

  const onSubmit: SubmitHandler<PostLoginRequest> = (data) => {
    loginMutate(data);
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputWrapper>
          <CommonInput
            type="text"
            label="이메일"
            placeholder="이메일을 입력해주세요."
            error={errors.email}
            {...register('email', ...registerOptions.email)}
          />
          <CommonInput
            type={showPassword ? 'text' : 'password'}
            label="비밀번호"
            placeholder="비밀번호를 입력해주세요."
            error={errors.password}
            rightIcon={
              <IconWrapper onClick={() => setShowPassword(() => !showPassword)}>
                <CommonIcon type={showPassword ? 'eye' : 'eyeSlash'} size="1.25rem" />
              </IconWrapper>
            }
            {...register('password', ...registerOptions.password)}
          />
        </InputWrapper>
        <ButtonWrapper>
          <CommonButton type="mdMiddle" isSubmit={true}>
            로그인
          </CommonButton>
          <CommonButton type="mdMiddle">회원가입</CommonButton>
        </ButtonWrapper>
      </Form>
    </Container>
  );
};

export default Login;