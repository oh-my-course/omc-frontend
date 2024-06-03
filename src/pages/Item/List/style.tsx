import styled from '@emotion/styled';

export const Container = styled.div`
  padding: 0 1.75rem 1.75rem;
  overflow-y: auto;
  height: 100%;
`;

export const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const AddContainer = styled.div`
  position: absolute;
  bottom: 90px;
  right: 20px;
  z-index: 10;
`;

export const ButtonBox = styled.div`
  display: flex;
  align-items: center;
`;

export const NoResult = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
