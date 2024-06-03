import { CommonSkeleton } from '@/shared/components';
import {
  Container,
  TextWrapper,
  InProgressVoteWrapper,
  InProgressVoteContainer,
  VoteContainer,
  VoteWrapper,
  VoteTextWrapper,
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
        <VoteContainer>
          <VoteTextWrapper>
            <CommonSkeleton type="text" />
          </VoteTextWrapper>
          <VoteWrapper>
            <CommonSkeleton type="vote" />
            <CommonSkeleton type="vote" />
            <CommonSkeleton type="vote" />
          </VoteWrapper>
        </VoteContainer>
      </Container>
    </>
  );
};

export default VoteLoading;
