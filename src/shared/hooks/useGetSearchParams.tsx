import { useSearchParams } from 'react-router-dom';

const useGetSearchParams = (params: string) => {
  const [searchParams] = useSearchParams();
  const currentParams = searchParams.get(params);

  return currentParams;
};

export default useGetSearchParams;
