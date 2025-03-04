import { useSWRWrapper } from 'hooks/utils';
import { mutate } from 'swr';
import { List } from 'types/data-types';

type HookTypes = {
  userId?: string | number;
  id?: string | number;
};

export function useGetLists(props: HookTypes) {
  const url = '/api/v1/products/products';
  const { data, isLoading, error, isValidating } = useSWRWrapper({
    url,
    data: { userId: props.userId },
  });

  return {
    data: data?.data?.data as List[],
    isLoading,
    error,
    isValidating,
    mutate: () => mutate(url),
  };
}

export function useGetList(props: HookTypes) {
  const url = `/api/v1/products/product?id=${props.id}`;
  const { data, isLoading, error, isValidating } = useSWRWrapper({
    url,
    data: { id: props.id },
  });

  return {
    data: data?.data?.data as List,
    isLoading,
    error,
    isValidating,
    mutate: () => mutate(url),
  };
}
