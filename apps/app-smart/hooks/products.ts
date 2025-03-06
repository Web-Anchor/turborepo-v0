import { useSWRWrapper } from 'hooks/utils';
import { mutate } from 'swr';
import { Product } from 'types/data-types';

type HookTypes = {
  id?: string | number;
};

export function useGetProducts(props: HookTypes) {
  const url = '/api/v1/products/products';
  const { data, isLoading, error, isValidating } = useSWRWrapper({
    url,
    data: { ...props },
  });

  return {
    data: data?.data?.data as Product[],
    isLoading,
    error,
    isValidating,
    mutate: () => mutate(url),
  };
}

export function useGetProduct(props: HookTypes) {
  const url = `/api/v1/products/product?id=${props.id}`;
  const { data, isLoading, error, isValidating } = useSWRWrapper({
    url,
    data: { ...props },
  });

  return {
    data: data?.data?.data as Product,
    isLoading,
    error,
    isValidating,
    mutate: () => mutate(url),
  };
}
