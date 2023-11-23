import styled from '@emotion/styled';

export const Container = styled.div`
  height: 100%;
`;

export const MemberInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 3rem;
`;

export const MemberInfoPanel = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

export const MemberInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  & button {
    margin-top: 0.4rem;
  }
`;

export const MemberIntroWrapper = styled.div`
  display: flex;
  padding: 1.5rem 3.5rem;
`;

export const ContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 1rem 1rem 1.5rem;
`;

export const ContentsPanel = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const SubTitleBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const ImagePanel = styled.div`
  display: flex;
  gap: 1rem;
  padding-top: 1rem;
`;

export const NoResult = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
`;
