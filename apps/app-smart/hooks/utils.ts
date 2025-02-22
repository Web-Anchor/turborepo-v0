import axios from 'axios';
import useSWR from 'swr';

// --------------------------------------------------------------------------------
// 📌  SWR fetchers
// --------------------------------------------------------------------------------
export function fetcher(url?: string, body?: object) {
  if (!url) {
    return Promise.reject(new Error('Missing URL'));
  }
  return axios.post(url, body).catch((error) => ({ error }));
}

const defaultOptions = {
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
};

// export swr wrapper functions
export function useSWRWrapper(props: {
  url?: string;
  data: object;
  options?: object;
}) {
  return useSWR(props.url, () => fetcher(props.url, props.data), {
    ...defaultOptions,
    ...props.options,
  });
}
