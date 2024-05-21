import { useNavigate } from 'react-router-dom';
import { CommonText, DividerImage } from '@/shared/components';
import type { VotesInfo } from '@/shared/types';
import { ContentsBox } from '../VoteInProgress/style';

const VoteInProgressItem = ({ cursorId, item1Info, item2Info, voteInfo }: VotesInfo) => {
  const navigate = useNavigate();

  return (
    <ContentsBox
      key={cursorId}
      onClick={() => {
        navigate(`${voteInfo.id}`);
      }}
    >
      <DividerImage type="live" images={[item1Info.image, item2Info.image]} />
      <CommonText type="smallInfo">{voteInfo.participants}명 참여중!</CommonText>
    </ContentsBox>
  );
};

export default VoteInProgressItem;
