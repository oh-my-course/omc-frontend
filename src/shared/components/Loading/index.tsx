import { Fragment, ReactNode } from 'react';
import {
  Box,
  Flex,
  Stack,
  VStack,
  Skeleton as SkeletonElement,
  SkeletonCircle,
  SkeletonText,
  Center,
  SimpleGrid,
} from '@chakra-ui/react';
import type { ChildrenType } from '@/shared/types';
import CommonDivider from '../Divider';
import {
  FeedWrapper,
  TextWrapperPadding,
  InProgressVoteContainer,
  InProgressVoteItemWrapper,
  VoteContainerBackground,
  VoteItemWrapper,
  GridItemList,
} from './style';
import { Container } from '@/features/item/components/Item/style';
import { Grid } from '@/features/rank/components/rankList/style';
import { WordWrapper } from '@/features/search/components/searchList/style';

interface CountProps {
  count: number;
}

interface CreateElementProps<T = unknown, U = ReactNode> extends CountProps {
  fn: Parameters<typeof Array.from<T, U>>[1];
}

interface GridProps extends ChildrenType {
  column: number;
  rows: number;
}

const createElement = ({ count, fn }: CreateElementProps) => {
  return Array.from({ length: count }, fn);
};

const Main = ({ children }: ChildrenType) => {
  return <Container>{children}</Container>;
};

const FeedContainer = ({ children }: ChildrenType) => {
  return <FeedWrapper>{children}</FeedWrapper>;
};

const Feed = ({ count }: CountProps) => {
  const fn = (index: number) => (
    <Fragment key={index}>
      <Flex>
        <SkeletonCircle size="2.5rem" />
        <SkeletonText mt="0.4rem" noOfLines={2} spacing="1" skeletonHeight="0.8rem" w="6rem" />
      </Flex>
      <SkeletonText mt="0.4rem" noOfLines={2} spacing="1" skeletonHeight="0.8rem" w="15rem" />
      <SimpleGrid columns={3} spacing="0.25rem" w="19rem">
        {Array.from({ length: 6 }).map((_, idx) => (
          <SkeletonElement key={idx} w="6.125rem" h="5.625rem" borderRadius="0.625rem" />
        ))}
      </SimpleGrid>
    </Fragment>
  );

  const element = createElement({ count, fn: (_, k) => fn(k) });

  return <>{element}</>;
};

const InProGressVoteContainer = ({ children }: ChildrenType) => {
  return <InProgressVoteContainer>{children}</InProgressVoteContainer>;
};

const InProgressVoteWrapper = ({ children }: ChildrenType) => {
  return <InProgressVoteItemWrapper>{children}</InProgressVoteItemWrapper>;
};

const InProgressVote = ({ count }: CountProps) => {
  const callFn = (index: number) => (
    <Box key={index}>
      <SkeletonCircle size="5.625rem" />
      <Center mt="0.3rem">
        <SkeletonElement w="3rem" h="0.8rem" />
      </Center>
    </Box>
  );

  const element = createElement({ count, fn: (_, index) => callFn(index) });

  return <>{element}</>;
};

const VoteContainer = ({ children }: ChildrenType) => {
  return <VoteContainerBackground>{children}</VoteContainerBackground>;
};

const VoteWrapper = ({ children }: ChildrenType) => {
  return <VoteItemWrapper>{children}</VoteItemWrapper>;
};

const Vote = ({ count }: CountProps) => {
  const callFn = (index: number) => (
    <Fragment key={index}>
      <Stack>
        <SkeletonElement w="18rem" h="0.8rem" />
        <Flex gap="3.31rem">
          <Stack>
            <SkeletonElement w="9.0625rem" h="6.5rem" borderRadius="0.625rem" />
            <Stack ml="0.5rem" spacing="0.3rem">
              <SkeletonElement w="2.5rem" h="0.8rem" />
              <SkeletonElement w="4.5rem" h="0.8rem" />
            </Stack>
          </Stack>
          <Stack>
            <SkeletonElement w="9.0625rem" h="6.5rem" borderRadius="0.625rem" />
            <Stack ml="0.5rem" spacing="0.3rem">
              <SkeletonElement w="2.5rem" h="0.8rem" />
              <SkeletonElement w="4.5rem" h="0.8rem" />
            </Stack>
          </Stack>
        </Flex>
      </Stack>
    </Fragment>
  );

  const element = createElement({
    count,
    fn: (_, index) => callFn(index),
  });

  return <>{element}</>;
};

const TextWrapper = ({ children }: ChildrenType) => {
  return <TextWrapperPadding>{children}</TextWrapperPadding>;
};

const Text = () => {
  return (
    <Stack>
      <SkeletonElement h="0.8rem" w="100%" />
    </Stack>
  );
};

const GridWrapper = ({ children, column, rows }: GridProps) => {
  return (
    <Grid column={column} rows={rows}>
      {children}
    </Grid>
  );
};

const GridItem = ({ count, children }: ChildrenType & CountProps) => {
  const callFn = (index: number) => <GridItemList key={index}>{children}</GridItemList>;

  const element = createElement({ count, fn: (_, index) => callFn(index) });

  return <>{element}</>;
};

const TextResult = ({ count }: CountProps) => {
  const callFn = (index: number) => (
    <WordWrapper key={index}>
      <SkeletonElement h="0.8rem" w="100%" />
      <CommonDivider size="sm" />
    </WordWrapper>
  );

  const element = createElement({ count, fn: (_, index) => callFn(index) });

  return <>{element}</>;
};

const Item = () => {
  return (
    <Box>
      <SkeletonElement w="6.125rem" h="5.625rem" borderRadius="0.625rem" />
      <VStack mt="0.3rem" spacing="0.3rem">
        <SkeletonElement w="2rem" h="0.8rem" />
        <SkeletonElement w="3rem" h="0.8rem" />
      </VStack>
    </Box>
  );
};

const Skeleton = Object.assign(Main, {
  FeedContainer,
  Feed,
  InProGressVoteContainer,
  InProgressVoteWrapper,
  InProgressVote,
  VoteContainer,
  VoteWrapper,
  Vote,
  TextWrapper,
  Text,
  GridWrapper,
  GridItem,
  TextResult,
  Item,
});

export default Skeleton;
