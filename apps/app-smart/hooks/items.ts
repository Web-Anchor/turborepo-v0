import { useSWRWrapper } from 'hooks/utils';
import { mutate } from 'swr';
import { Item } from 'types/data-types';

type HookTypes = {
  userId?: string | number;
  id?: string | number;
};

export function useGetItems(props: HookTypes) {
  const url = '/api/v1/items/items';
  const { data, isLoading, error, isValidating } = useSWRWrapper({
    url,
    data: { userId: props.userId },
  });

  return {
    data: data?.data?.data as Item[],
    isLoading,
    error,
    isValidating,
    mutate: () => mutate(url),
  };
}

export function useGetItem(props: HookTypes) {
  const url = `/api/v1/items/item?id=${props.id}`;
  const { data, isLoading, error, isValidating } = useSWRWrapper({
    url,
    data: { ...props },
  });

  return {
    data: data?.data?.data as Item,
    isLoading,
    error,
    isValidating,
    mutate: () => mutate(url),
  };
}
