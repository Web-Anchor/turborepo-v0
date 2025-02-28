import { useSWRWrapper } from 'hooks/utils';
import { mutate } from 'swr';
import { User } from 'types/data-types';

type HookTypes = {
  id?: string | number;
};

export function useGetUsers(props: HookTypes) {
  const url = '/api/v1/users/users';
  const { data, isLoading, error, isValidating } = useSWRWrapper({
    url,
    data: props,
  });

  return {
    data: data?.data?.data as User[],
    isLoading,
    error,
    isValidating,
    mutate: () => mutate(url),
  };
}

export function useGetUser(props: HookTypes) {
  const url = `/api/v1/users/users?id=${props.id}`;
  const { data, isLoading, error, isValidating } = useSWRWrapper({
    url,
    data: { id: props.id },
  });

  return {
    data: data?.data?.data as User,
    isLoading,
    error,
    isValidating,
    mutate: () => mutate(url),
  };
}

export function useWhoIAm() {
  const url = `/api/v1/users/whoiam`;
  const { data, isLoading, error, isValidating } = useSWRWrapper({
    url,
  });

  return {
    data: data?.data?.data as User,
    isLoading,
    error,
    isValidating,
    mutate: () => mutate(url),
  };
}
