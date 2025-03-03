import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from 'axios';

// Extend config to add custom properties
type CustomAxiosRequestConfig = AxiosRequestConfig & {
  // If true, the default base URL will be attached if not already present.
  addBaseUrl?: boolean;
  addAuthToken?: boolean;
  // If provided, this string will be appended to the request URL as a query parameter.
  query?: 'auth';
};

type CustomAxiosInstance = AxiosInstance & {
  get<T = any, R = AxiosResponse<T>>(
    url: string,
    config?: CustomAxiosRequestConfig
  ): Promise<R>;
  post<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: any,
    config?: CustomAxiosRequestConfig
  ): Promise<R>;
};

// Create an instance with a default configuration (without baseURL)
const api: CustomAxiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout to avoid hanging requests
});

// Helper function to retrieve the token
function getToken(): string | null {
  // Retrieve token from localStorage, cookie, or another secure store.
  console.log('🔐 Token:', 'Retrieved from secure store');

  return null;
}

// ⬇️ Request interceptor for conditional config modification
api.interceptors.request.use(
  ({ ...config }: CustomAxiosRequestConfig): InternalAxiosRequestConfig => {
    // Conditionally add the baseURL if the flag is set and baseURL isn't already provided.
    if (config.addBaseUrl && !config.baseURL) {
      config.baseURL = process.env.NEXT_PUBLIC_GRAPHQL_URL;
    }

    // Conditionally attach the token if available.
    if (config.addAuthToken) {
      const token = getToken();
      if (token) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        };
      }
    }

    // Conditionally append a query parameter if query is provided.
    if (config.query && config.url) {
      // Check if the URL already contains a query string.
      const separator = config.url.includes('?') ? '&' : '?';
      config.url += `${separator}query=${encodeURIComponent(config.query)}`;
    }

    return config as InternalAxiosRequestConfig;
  },
  (error: AxiosError) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// ➡️ Response interceptor for global error handling
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    console.error('Response error:', error);
    return Promise.reject(error);
  }
);

// Generic helper function for typed POST API calls (optional)
export const postApi = async <T>(
  url: string,
  data?: any,
  config?: CustomAxiosRequestConfig
): Promise<AxiosResponse<T>> => {
  return api.post<T>(url, data, config);
};

export default api;
