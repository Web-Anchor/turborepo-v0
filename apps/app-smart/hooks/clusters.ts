import { useSWRWrapper } from 'hooks/utils';

type HookTypes = {
  userId?: string;
};

export function useGetClusters(props: HookTypes) {
  return useSWRWrapper({
    url: '/api/clusters',
    data: { userId: props.userId },
  });
}
