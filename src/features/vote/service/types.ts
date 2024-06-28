import { LoaderFunctionArgs } from 'react-router-dom';
import { QueryClient } from '@tanstack/react-query';
import { VoteInfo, VotesInfo } from '@/shared/types';
import VoteLoader from './loader';
import { ItemInfo } from '@/shared/types/item';

export interface GetVotesRequest {
  hobby: string;
  sort?: 'popularity' | 'recent';
  status: 'inprogress' | 'completed' | 'posted' | 'participated';
  cursorId?: string;
  size?: number;
}

export interface GetVotesResponse {
  nextCursorId: string;
  votes: VotesInfo[];
}

export interface PostVotesRequest {
  hobby: string;
  content: string;
  item1Id: number;
  item2Id: number;
}

export interface PostVotesResponse {
  voteId: number;
}

export interface PostVoteParticipationRequest {
  voteId: number;
  itemId: number;
}

export interface GetVoteDetailResponse {
  item1Info: ItemInfo;
  item2Info: ItemInfo;
  voteInfo: VoteInfo;
  isOwner: boolean;
  selectedItemId: number;
}

export interface LoaderProp {
  request: LoaderFunctionArgs['request'];
  queryClient: QueryClient;
}

export interface ParamsInfo {
  paramsInfo: ReturnType<typeof VoteLoader>['paramsInfo'];
}
