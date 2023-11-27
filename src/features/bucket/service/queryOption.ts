import { queryOptions } from '@tanstack/react-query';
import { GetBucketDetailRequest, GetBucketMyItemsRequest, GetBucketsRequest, bucketApi } from '.';

const bucketQueryOption = {
  all: ['bucket'] as const,

  list: ({ nickname, hobby, cursorId, size = 10 }: GetBucketsRequest) =>
    queryOptions({
      queryKey: [...bucketQueryOption.all, nickname, hobby] as const,
      queryFn: () => bucketApi.getBuckets({ nickname, hobby, cursorId, size }),
    }),

  detail: ({ nickname, bucketId }: GetBucketDetailRequest) =>
    queryOptions({
      queryKey: [...bucketQueryOption.all, nickname, bucketId] as const,
      queryFn: () => bucketApi.getBucketDetail({ nickname, bucketId }),
    }),

  myItemList: ({ bucketId, hobbyName, cursorId, size = 10 }: GetBucketMyItemsRequest) =>
    queryOptions({
      queryKey: [...bucketQueryOption.all, bucketId] as const,
      queryFn: () => bucketApi.getBucketMyItems({ bucketId, hobbyName, cursorId, size }),
    }),
};

export default bucketQueryOption;
