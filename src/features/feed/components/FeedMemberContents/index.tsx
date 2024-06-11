import { useParams, useSearchParams } from 'react-router-dom';
import { useSuspenseQuery } from '@tanstack/react-query';
import { CommonTabs } from '@/shared/components';
import { Container } from '../FeedMemberContents/style';
import FeedMemberList from '../FeedMemberList';
import { hobbyQueryOption } from '@/features/hobby/service';

const HOBBY = 'hobby';

interface FeedMemberContentsProps {
  isLikedFeedTab: boolean;
}

const FeedMemberContents = ({ isLikedFeedTab }: FeedMemberContentsProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { nickname } = useParams();
  const hobby = useSuspenseQuery({ ...hobbyQueryOption.all(), select: (data) => data.hobbies });

  const currentTabIndex = hobby.data
    .map(({ name }) => name)
    .indexOf(searchParams.get(HOBBY) || hobby.data[0].name);

  return (
    <CommonTabs
      currentTabIndex={currentTabIndex}
      tabsType="soft-rounded"
      isFitted={false}
      onClick={(value) => {
        if (searchParams.has(HOBBY)) {
          searchParams.set(HOBBY, value);
        } else {
          searchParams.append(HOBBY, value);
        }
        setSearchParams(searchParams);
      }}
      tabsData={hobby.data.map(({ name, value }) => ({
        value: name,
        label: value,
        content: (
          <Container>
            <FeedMemberList
              hobbyName={searchParams.get('hobby') || hobby.data[0].name}
              nickname={nickname!}
              onlyNicknameLikeFeeds={isLikedFeedTab}
            />
          </Container>
        ),
      }))}
    />
  );
};

export default FeedMemberContents;
