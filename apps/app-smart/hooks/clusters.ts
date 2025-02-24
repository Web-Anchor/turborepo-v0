import { useSWRWrapper } from 'hooks/utils';
import { Cluster } from 'types/data-types';

type HookTypes = {
  userId?: string | number;
};

export function useGetClusters(props: HookTypes) {
  const { data, isLoading, error, isValidating } = useSWRWrapper({
    url: '/api/v1/clusters/clusters',
    data: { userId: props.userId },
  });

  return {
    data: data?.data?.data as Cluster[],
    isLoading,
    error,
    isValidating,
  };
}
