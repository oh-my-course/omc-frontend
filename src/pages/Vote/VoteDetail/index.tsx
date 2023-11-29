import { MouseEvent } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { CommonDrawer, CommonIconButton, CommonText, DateText, Header } from '@/shared/components';
import { useAuthCheck, useCustomToast, useDrawer } from '@/shared/hooks';
import { Body, Content, Footer, Span, Title } from './style';
import { VoteOptionItem } from '@/features/vote/components';
import { useCancelVote, useDeleteVote, useParticipationVote } from '@/features/vote/hooks';
import { voteQueryOption } from '@/features/vote/service';

const VoteDetail = () => {
  const { voteId } = useParams() as { voteId: string };
  const numberVoteId = Number(voteId);
  const { data: voteDetailData } = useQuery({ ...voteQueryOption.detail(numberVoteId) });
  const { mutate: DeleteVoteMutate } = useDeleteVote();
  const { mutate: ParticipationVoteMutate } = useParticipationVote(numberVoteId);
  const { mutate: CancelVoteMutate } = useCancelVote(numberVoteId);
  const openToast = useCustomToast();
  const isLogin = useAuthCheck();
  const { isOpen, onOpen, onClose } = useDrawer();

  const toggleVoteParticipation = (e: MouseEvent<HTMLButtonElement>) => {
    const { value } = e.currentTarget;
    if (voteDetailData?.voteInfo.isVoting && isLogin) {
      if (voteDetailData?.selectedItemId !== Number(value)) {
        ParticipationVoteMutate({ voteId: numberVoteId, itemId: Number(value) });
      } else {
        CancelVoteMutate(numberVoteId);
      }
    } else if (!voteDetailData?.voteInfo.isVoting) {
      openToast({ type: 'error', message: '종료된 투표에는 참여하실수 없습니다.' });
    } else {
      openToast({ type: 'error', message: '로그인이 필요한 서비스입니다.' });
    }
  };

  return (
    <>
      <Header type="back" />
      <Body>
        <Title>
          <CommonText type="normalTitle" noOfLines={0}>
            {voteDetailData?.voteInfo.isVoting ? '진행중인 투표' : '종료된 투표'}
          </CommonText>
          {voteDetailData?.isOwner && <CommonIconButton type="delete" onClick={onOpen} />}
        </Title>
        <CommonText type="smallInfo" noOfLines={0}>
          {voteDetailData?.voteInfo.content}
        </CommonText>
        <Content>
          <VoteOptionItem
            itemInfo={voteDetailData?.item1Info}
            votes={voteDetailData?.voteInfo.item1Votes}
            onClick={toggleVoteParticipation}
          />
          <Span>VS</Span>
          <VoteOptionItem
            itemInfo={voteDetailData?.item2Info}
            votes={voteDetailData?.voteInfo.item2Votes}
            onClick={toggleVoteParticipation}
          />
        </Content>
        <Footer>
          <DateText createdDate={voteDetailData?.voteInfo.startTime || ''} />
          <CommonText type="smallInfo" noOfLines={0}>
            {voteDetailData?.voteInfo.participants}명 참여
          </CommonText>
        </Footer>
      </Body>
      <CommonDrawer
        isOpen={isOpen}
        onClose={onClose}
        onClickFooterButton={() => DeleteVoteMutate(numberVoteId)}
        isFull={false}
      >
        정말로 투표를 삭제하시겠습니까?
      </CommonDrawer>
    </>
  );
};

export default VoteDetail;
