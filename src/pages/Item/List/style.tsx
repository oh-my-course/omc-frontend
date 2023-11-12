import styled from '@emotion/styled';

export const CommonContainer = styled.div`
  padding: 0 1.75rem;
  overflow-y: scroll;
`;

export const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ItemTextContaienr = styled.div`
  margin: 1rem 0;
`;

export const ItemListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(30%, 1fr));
  grid-auto-rows: auto;
  gap: 0.9rem;
  padding: 0 0.87rem;
`;

export const RelativeContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const AddContainer = styled.div`
  position: absolute;
  right: -10px;
  bottom: 10px;
  z-index: 10;
`;
