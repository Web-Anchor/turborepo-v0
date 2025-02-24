import { useSWRWrapper } from 'hooks/utils';
import { mutate } from 'swr';
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

// cluster
type ClusterProps = {
  id?: string | number;
};

export function useGetCluster(props: ClusterProps) {
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
