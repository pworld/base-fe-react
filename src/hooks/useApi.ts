import { useState, useCallback } from 'react';
import { AxiosRequestConfig, Method } from 'axios';
import { axiosInstance } from '@/utility';
import { API_BASE_URL } from '@/config/env';

type UseApiState<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

type UseApiReturnType<T> = UseApiState<T> & {
  sendRequest: (endpoint: string, method: Method, payload?: any, config?: AxiosRequestConfig) => Promise<void>;
};

export const useApi = <T,>(): UseApiReturnType<T> => {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const sendRequest = useCallback(async (
    endpoint: string,
    method: Method,
    payload?: any,
    config: AxiosRequestConfig = {}
  ) => {
    setState({ data: null, loading: true, error: null });

    // Constructing the request configuration
    const fullUrl = `${API_BASE_URL}${endpoint}`;
    const requestConfig: AxiosRequestConfig = {
      url: fullUrl,
      method,
      ...config,
    };

    // If the method is not GET, attach the payload as data
    if (method.toLowerCase() !== 'get' && payload) {
      requestConfig.data = payload;
    } else if (payload) {
      // For GET requests, append payload as params
      requestConfig.params = { ...requestConfig.params, ...payload };
    }

    try {
      const response = await axiosInstance(requestConfig);
      setState({ data: response.data, loading: false, error: null });
    } catch (error: any) {
      setState({ data: null, loading: false, error: error || 'An error occurred' });
    }
  }, []);

  return { ...state, sendRequest };
};
