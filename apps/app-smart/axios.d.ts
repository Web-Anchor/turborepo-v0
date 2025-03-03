import 'axios';

declare module 'axios' {
  export interface AxiosRequestConfig {
    addBaseUrl?: boolean;
    addAuthToken?: boolean;
    query?: 'auth';
  }
}
