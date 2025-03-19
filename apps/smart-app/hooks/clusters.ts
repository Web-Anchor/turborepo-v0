import { useSWRWrapper } from 'hooks/utils';
import { mutate } from 'swr';
import { Cluster } from 'types/data-types';

type HookTypes = {
  userId?: string | number;
  id?: string | number;
};

export function useGetClusters(props: HookTypes) {
  const url = '/api/v1/clusters/clusters';
  const { data, isLoading, error, isValidating } = useSWRWrapper({
    url,
    data: { userId: props.userId },
  });

  return {
    data: data?.data?.data as Cluster[],
    isLoading,
    error,
    isValidating,
    mutate: () => mutate(url),
  };
}

export function useGetCluster(props: HookTypes) {
  const url = `/api/v1/clusters/cluster?id=${props.id}`;
  const { data, isLoading, error, isValidating } = useSWRWrapper({
    url,
    data: { id: props.id },
  });

  return {
    data: data?.data?.data as Cluster,
    isLoading,
    error,
    isValidating,
    mutate: () => mutate(url),
  };
}
