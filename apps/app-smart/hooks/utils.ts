import axios from 'axios';
import useSWR from 'swr';

// --------------------------------------------------------------------------------
// 📌  SWR fetchers
// --------------------------------------------------------------------------------
export function fetcher(url: string, body?: object) {
  return axios.post(url, body);
}

// export swr wrapper functions
export function useSWRWrapper(
  url?: string,
  options = {
    revalidateOnFocus: true,
    revalidateOnReconnect: false,
    revalidateOnMount: true,
    dedupingInterval: 10000,
    refreshInterval: 10000,
    refreshWhenHidden: false,
    refreshWhenOffline: false,
    errorRetryCount: 3,
    errorRetryInterval: 5000,
    focusThrottleInterval: 5000,
    loadingTimeout: 3000,
  }
) {
  const { data, error, isValidating, mutate } = useSWR(url, fetcher, options);

  return {
    data,
    isLoading: !error && !data,
    isError: error,
    isValidating,
    mutate,
  };
}
