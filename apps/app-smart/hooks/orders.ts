import { useSWRWrapper } from 'hooks/utils';
import { mutate } from 'swr';
import { Order } from 'types/data-types';

type HookTypes = {
  id?: string | number;
  type?: 'etsy' | 'shopify' | 'woocommerce' | 'manual';
};

export function useGetOrders(props: HookTypes) {
  const url = '/api/v1/orders?type=hello';
  const { data, isLoading, error, isValidating } = useSWRWrapper({
    url,
    data: { ...props },
    options: { method: 'GET' },
  });

  return {
    data: data?.data?.data as Order[],
    isLoading,
    error,
    isValidating,
    mutate: () => mutate(url),
  };
}

export function useGetOrder(props: HookTypes) {
  const url = `/api/v1/orders/list?id=${props.id}`;
  const { data, isLoading, error, isValidating } = useSWRWrapper({
    url,
    data: { ...props },
  });

  return {
    data: data?.data?.data as Order,
    isLoading,
    error,
    isValidating,
    mutate: () => mutate(url),
  };
}
