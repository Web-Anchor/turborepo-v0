import axios from 'axios';
import useSWR from 'swr';

// --------------------------------------------------------------------------------
// 📌  SWR fetchers
// --------------------------------------------------------------------------------
export function fetcher(url?: string, body?: object) {
  if (!url) {
    return Promise.reject(new Error('Missing URL'));
  }
  return axios
    .post(url, body, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .catch((error) => ({ error }));
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

type SWRWrapperProps = {
  url?: string;
  data: object;
  options?: object;
};

type SWRResponseType = {
  data: any;
  isLoading: boolean;
  error: any;
  isValidating: boolean;
  mutate: (data: any) => void;
};

export function useSWRWrapper(props: SWRWrapperProps): SWRResponseType {
  return useSWR(props.url, () => fetcher(props.url, props.data), {
    ...defaultOptions,
    ...props.options,
  });
}
