import { useSuspenseQuery } from '@tanstack/react-query';
import { hobbyQueryOption } from '../service';

const useHobby = () => {
  return useSuspenseQuery({ ...hobbyQueryOption.all(), staleTime: Infinity });
};

export default useHobby;
