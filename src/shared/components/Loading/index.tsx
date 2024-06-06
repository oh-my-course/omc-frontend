import { Fragment, ReactNode } from 'react';
import {
  Box,
  Flex,
  Stack,
  // VStack,
  Skeleton as SkeletonElement,
  SkeletonCircle,
  SkeletonText,
  Center,
  SimpleGrid,
} from '@chakra-ui/react';
import type { ChildrenType } from '@/shared/types';
import {
  FeedWrapper,
  TextWrapperPadding,
  Container,
  InProgressVoteContainer,
  InProgressVoteItemWrapper,
  VoteContainerBackground,
  VoteItemWrapper,
} from './style';

type MapFnType<T = unknown, U = ReactNode> = Parameters<typeof Array.from<T, U>>[1];

interface CountProps {
  count: number;
}

interface CreateElementProps extends CountProps {
  fn: MapFnType;
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
      <SkeletonElement h="0.8rem" />
    </Stack>
  );
};

// const Item = ({ data }) => {
//   return (
//     <>
//       {data.map(() => {
//         <>
//           <Box>
//             <SkeletonElement w="6.125rem" h="5.625rem" borderRadius="0.625rem" />
//             <Stack mt="0.3rem" ml="0.5rem" spacing="0.3rem">
//               <SkeletonElement w="2.5rem" h="0.8rem" />
//               <SkeletonElement w="4.5rem" h="0.8rem" />
//             </Stack>
//           </Box>
//         </>;
//       })}
//     </>
//   );
// };

// const Bucket = ({ data }) => {
//   return (
//     <>
//       {data.map(() => {
//         <>
//           <Box>
//             <SkeletonElement w="6.125rem" h="5.625rem" borderRadius="0.625rem" />
//             <VStack mt="0.3rem" spacing="0.3rem">
//               <SkeletonElement w="2rem" h="0.8rem" />
//               <SkeletonElement w="3rem" h="0.8rem" />
//             </VStack>
//           </Box>
//         </>;
//       })}
//     </>
//   );
// };

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
});

export default Skeleton;
