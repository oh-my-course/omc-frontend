import { CommonSkeleton } from '@/shared/components';
import {
  Container,
  TextWrapper,
  InProgressVoteWrapper,
  InProgressVoteContainer,
  VoteWrapper,
} from './style';

const VoteLoading = () => {
  return (
    <>
      <Container>
        <TextWrapper>
          <CommonSkeleton type="text" />
        </TextWrapper>
        <InProgressVoteContainer>
          <InProgressVoteWrapper>
            <CommonSkeleton type="inProgressVote" />
            <CommonSkeleton type="inProgressVote" />
            <CommonSkeleton type="inProgressVote" />
            <CommonSkeleton type="inProgressVote" />
          </InProgressVoteWrapper>
        </InProgressVoteContainer>
        <VoteWrapper>
          <CommonSkeleton type="text" />
          <CommonSkeleton type="vote" />
          <CommonSkeleton type="vote" />
        </VoteWrapper>
      </Container>
    </>
  );
};

export default VoteLoading;
