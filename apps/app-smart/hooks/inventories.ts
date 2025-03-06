import { useSWRWrapper } from 'hooks/utils';
import { mutate } from 'swr';
import { Inventory } from 'types/data-types';

type HookTypes = {
  userId?: string | number;
  id?: string | number;
};

export function useGetInventories(props: HookTypes) {
  const url = '/api/v1/inventories/inventories';
  const { data, isLoading, error, isValidating } = useSWRWrapper({
    url,
    data: { userId: props.userId },
  });

  return {
    data: data?.data?.data as Inventory[],
    isLoading,
    error,
    isValidating,
    mutate: () => mutate(url),
  };
}

export function useGetInventory(props: HookTypes) {
  const url = `/api/v1/inventories/inventory?id=${props.id}`;
  const { data, isLoading, error, isValidating } = useSWRWrapper({
    url,
    data: { id: props.id },
  });

  return {
    data: data?.data?.data as Inventory,
    isLoading,
    error,
    isValidating,
    mutate: () => mutate(url),
  };
}
