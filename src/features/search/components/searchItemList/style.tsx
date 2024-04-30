import styled from '@emotion/styled';

interface TextBox {
  width: number; // width는 숫자 타입
}

export const Wrapper = styled.a`
  display: flex;
  align-items: center;
`;

export const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem 0;
`;

export const TextBox = styled.div<TextBox>`
  padding: 0.5rem 0;
  width: ${(props) => props.width}%;
`;

export const NoResult = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
