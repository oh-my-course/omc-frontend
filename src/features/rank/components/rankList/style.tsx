import styled from '@emotion/styled';

interface GirdProp {
  column: number;
  rows?: number;
}

export const WrapperTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0 1rem;
`;

export const Grid = styled.ul<GirdProp>`
  overflow: hidden;
  display: grid;
  grid-template-columns: ${(props) => `repeat(${props.column}, 1fr)`};
  grid-template-rows: ${(props) => `repeat(${props.rows || 5}, 1fr)`};
  grid-auto-flow: column;
  counter-reset: orderList 0;
  gap: 1.5rem 1rem;
`;

export const GridItemList = styled.li`
  &::before {
    counter-increment: orderList;
    content: counter(orderList) '. ';
    font-size: 0.75rem;
  }

  display: flex;
  align-items: center;
  gap: 0 0.3rem;

  &:nth-of-type(-n + 3)::before {
    color: blue;
  }
`;

export const Item = styled.a`
  cursor: pointer;
`;
