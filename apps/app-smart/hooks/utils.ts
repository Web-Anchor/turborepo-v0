import axios from 'lib/axios';
import { AxiosRequestConfig } from 'axios';
import useSWR from 'swr';

// --------------------------------------------------------------------------------
// 📌  SWR fetchers
// --------------------------------------------------------------------------------
export function fetcher(
  url?: string,
  body?: object,
  options?: AxiosRequestConfig
) {
  if (!url) {
    return Promise.reject(new Error('Missing URL'));
  }
  const method = options?.method || 'GET';

  const config = {
    url,
    method,
    ...options,
  };

  if (method.toUpperCase() === 'GET') {
    config.params = body; // Attach query parameters for GET requests
  } else {
    config.data = body; // Attach body for non-GET requests
  }

  return axios(config).catch((error) => ({ error }));
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
  data?: object;
  options?: object;
};

type SWRResponseType = {
  data: any;
  isLoading: boolean;
  error: any;
  isValidating: boolean;
  mutate: (data: any) => void;
};

export function useSWRWrapper({
  data = {},
  ...props
}: SWRWrapperProps): SWRResponseType {
  return useSWR(props.url, () => fetcher(props.url, data), {
    ...defaultOptions,
    ...props.options,
  });
}
