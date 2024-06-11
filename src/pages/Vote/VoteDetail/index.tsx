import { useParams } from 'react-router-dom';
import { useSuspenseQuery } from '@tanstack/react-query';
import { CommonDrawer, CommonIconButton, CommonText, DateText, Header } from '@/shared/components';
import { useDrawer } from '@/shared/hooks';
import { Body, Content, Footer, Span, Title } from './style';
import { VoteOptionItem } from '@/features/vote/components';
import { useDeleteVote } from '@/features/vote/hooks';
import { voteQueryOption } from '@/features/vote/service';

const VoteDetail = () => {
  const { voteId } = useParams() as { voteId: string };
  const numberVoteId = Number(voteId);
  const { data: voteDetailData } = useSuspenseQuery({ ...voteQueryOption.detail(numberVoteId) });
  const { mutate: DeleteVoteMutate } = useDeleteVote();
  const { isOpen, onOpen, onClose } = useDrawer();

  return (
    <>
      <Header type="back" />
      <Body>
        <Title>
          <CommonText type="normalTitle" noOfLines={0}>
            {voteDetailData.voteInfo.isVoting ? '진행중인 투표' : '종료된 투표'}
          </CommonText>
          {voteDetailData.isOwner && <CommonIconButton type="delete" onClick={onOpen} />}
        </Title>
        <CommonText type="smallInfo" noOfLines={0}>
          {voteDetailData.voteInfo.content}
        </CommonText>
        <Content>
          <VoteOptionItem
            voteDetailData={voteDetailData!}
            itemInfo={voteDetailData.item1Info}
            votes={voteDetailData.voteInfo.item1Votes}
            voteId={numberVoteId}
          />
          <Span>VS</Span>
          <VoteOptionItem
            voteDetailData={voteDetailData}
            itemInfo={voteDetailData.item2Info}
            votes={voteDetailData.voteInfo.item2Votes}
            voteId={numberVoteId}
          />
        </Content>
        <Footer>
          <DateText createdDate={voteDetailData.voteInfo.startTime || ''} />
          <CommonText type="smallInfo" noOfLines={0}>
            {voteDetailData.voteInfo.participants}명 참여
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
