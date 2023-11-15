import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import styled from '@emotion/styled';
import { CommonButton, CommonIcon, CommonInput } from '@/shared/components';
import { axiosClient } from '@/core/service/axios';
import useValidateForm from '@/shared/hooks/useValidateForm';
interface Login {
  email: string;
  password: string;
}

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Login>();
  const [showPassword, setShowPassword] = useState(false);
  const registerOptions = useValidateForm();

  const onSubmit: SubmitHandler<Login> = (data) => {
    console.log(data);
    const { email, password } = data;
    axiosClient.post('/members/login', {
      email,
      password,
    });
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

export const Container = styled.main`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

export const InputWrapper = styled.article`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
export const ButtonWrapper = styled.article`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const IconWrapper = styled.div`
  display: flex;
`;
