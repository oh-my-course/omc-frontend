import styled from '@emotion/styled';

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  background-color: #e2e8f0;
`;

export const TextWrapper = styled.article`
  padding: 0.3rem 0;
  flex-basis: 10%;
`;

export const InProgressVoteContainer = styled.article`
  margin: 1rem 0;
  flex-basis: 30%;
`;

export const InProgressVoteWrapper = styled.div`
  display: flex;
  gap: 0.7rem;
  /* padding: 0 1.25rem; */
`;

export const VoteWrapper = styled.article`
  background-color: #f7fafc;
  flex-basis: 60%;
`;

// 고민
// 1.처음부터 다시 ui 설계 -> 각각 할당되었던 스타일 컴포넌트 적용 -> 너무 많은 코드양이 증가 -> 성능에 대한 문제 발생
// 2.해당 컴포넌트에만 suspense 적용 -> 컴포넌트 구조 수정 -> 이게 맞다고 생각
// 하지만 그러면 성능 검사를 다시 진행해야한다.
