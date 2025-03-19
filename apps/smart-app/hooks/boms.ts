import { useSWRWrapper } from 'hooks/utils';
import { mutate } from 'swr';
import { BOM } from 'types/data-types';

type HookTypes = {
  userId?: string | number;
  id?: string | number;
};

export function useGetBOMs(props: HookTypes) {
  const url = '/api/v1/boms/boms';
  const { data, isLoading, error, isValidating } = useSWRWrapper({
    url,
    data: { userId: props.userId },
  });

  return {
    data: data?.data?.data as BOM[],
    isLoading,
    error,
    isValidating,
    mutate: () => mutate(url),
  };
}

export function useGetBOM(props: HookTypes) {
  const url = `/api/v1/boms/bom?id=${props.id}`;
  const { data, isLoading, error, isValidating } = useSWRWrapper({
    url,
    data: { id: props.id },
  });

  return {
    data: data?.data?.data as BOM,
    isLoading,
    error,
    isValidating,
    mutate: () => mutate(url),
  };
}
