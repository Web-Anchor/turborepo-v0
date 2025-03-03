import { useSWRWrapper } from 'hooks/utils';
import { mutate } from 'swr';
import { Statistics } from 'types/data-types';

export function useStatistics() {
  const url = `/api/v1/statistics`;
  const { data, isLoading, error, isValidating } = useSWRWrapper({
    url,
  });
  const statistics = data?.data?.data as Statistics;
  return {
    data: statistics,
    statistics,
    isLoading,
    error,
    isValidating,
    mutate: () => mutate(url),
  };
}
