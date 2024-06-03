import { useLoaderData, useSearchParams } from 'react-router-dom';
import { CommonSelect, CommonTabs } from '@/shared/components';
import { useAuthCheck } from '@/shared/hooks';
import { ParamsInfo } from '../../service';
import VoteList from '../VoteList';
import { Container, ContentsWrapper, NoResult, SelectWrapper } from './style';

const VOTE_STATE = [
  {
    VALUE: 'completed',
    LABEL: '종료된 투표',
  },
  {
    VALUE: 'posted',
    LABEL: '올린 투표',
  },
  {
    VALUE: 'participated',
    LABEL: '참여한 투표',
  },
];

const Votes = () => {
  const {
    paramsInfo: { getStatus, getHobby, getSort },
  } = useLoaderData() as ParamsInfo;
  const [, setSearchParams] = useSearchParams();
  const isLogin = useAuthCheck();

  const currentTabIndex = VOTE_STATE.map(({ VALUE }) => VALUE).indexOf(getStatus);
  const isLoginInVotes = (value: string) => value !== 'completed' && !isLogin;

  return (
    <Container>
      <CommonTabs
        currentTabIndex={currentTabIndex}
        onClick={(value) => {
          setSearchParams({ hobby: getHobby, status: value });
        }}
        tabsData={VOTE_STATE.map(({ VALUE, LABEL }) => {
          return {
            value: VALUE,
            label: LABEL,
            content: (
              <ContentsWrapper>
                <SelectWrapper>
                  {VALUE === 'completed' && (
                    <CommonSelect
                      selectedValue={getSort?.toLowerCase()}
                      onChange={(e) => {
                        const sort = e.target.value;
                        setSearchParams({
                          hobby: getHobby,
                          status: getStatus,
                          sort: sort,
                        });
                      }}
                    />
                  )}
                </SelectWrapper>
                {isLoginInVotes(VALUE) ? (
                  <NoResult>로그인이 필요한 서비스입니다.</NoResult>
                ) : (
                  <VoteList label={LABEL} />
                )}
              </ContentsWrapper>
            ),
          };
        })}
      />
    </Container>
  );
};

export default Votes;
