import { AxiosInstance } from 'axios';
import { DataProvider, OpenNotificationParams } from '@refinedev/core';
import { axiosInstance, generateSort, generateFilter } from '@/utility';

const customDataProvider = (
  apiUrl: string,
  httpClient: AxiosInstance = axiosInstance,
  openNotification: (params: OpenNotificationParams) => void
): Omit<Required<DataProvider>, 'createMany' | 'updateMany' | 'deleteMany'> => ({
  getList: async ({ resource, pagination, filters, sorters }) => {
    try {
      const url = `${apiUrl}/${resource}`;

      const { current = 1, pageSize = 10 } = pagination ?? {};
      const safeFilters = filters || [];
      const safeSorters = sorters || [];

      const queryFilters = generateFilter(safeFilters);
      const querySorters = generateSort(safeSorters);

      const response = await httpClient.post(url, {
        queryops: {
          filter: queryFilters,
          sort: querySorters,
          limit: pageSize,
          page: current, // Changed from 'offset' to 'page'
        },
        include_total_rows: true, // Added to include total rows in the response
      });

      return {
        data: response?.data?.data?.data || response?.data,
        // total: parseInt(response.headers['x-total-count'], 10),
        total: response?.data?.data?.total_rows || 0,
      };
    } catch (error: any) {
      openNotification({
        type: 'error',
        message: error.message || 'Error',
        description: error.description || 'An unexpected error occurred',
      });
      throw error;
    }
  },

  getOne: async ({ resource, id }) => {
    try {
      const response = await httpClient.get(`${apiUrl}/${resource}/${id}`);
      return { data: response?.data?.data || response.data };
    } catch (error: any) {
      openNotification({
        type: 'error',
        message: error,
        description: 'Error' || 'An unexpected error occurred',
      });
      throw error;
    }
  },

  create: async ({ resource, variables }) => {
    try {
      const response = await httpClient.post(`${apiUrl}/${resource}`, variables);

      openNotification({
        type: 'success',
        message: response.data.message,
        description: 'Success',
      });

      return { data: response.data };
    } catch (error: any) {
      openNotification({
        type: 'error',
        message: error,
        description: 'Error' || 'An unexpected error occurred',
      });
      throw error;
    }
  },

  update: async ({ resource, id, variables }) => {
    const updatedResource = resource.replace(':id', id.toString());
    try {
      const response = await httpClient.put(`${apiUrl}/${updatedResource}`, variables);

      openNotification({
        type: 'success',
        message: response.data.message,
        description: 'Success',
      });

      return { data: response.data?.data || response.data };
    } catch (error: any) {
      openNotification({
        type: 'error',
        message: error,
        description: 'Error' || 'An unexpected error occurred',
      });
      throw error;
    }
  },

  deleteOne: async ({ resource, id, variables }) => {
    const updatedResource = resource.replace(':id', id.toString());
    try {
      const response = await httpClient.delete(`${apiUrl}/${updatedResource}`, { data: variables });

      openNotification({
        type: 'success',
        message: response.data.message,
        description: 'Success',
      });

      return { data: response.data };
    } catch (error: any) {
      openNotification({
        type: 'error',
        message: error,
        description: 'Error' || 'An unexpected error occurred',
      });
      throw error;
    }
  },

  getMany: async ({ resource, ids }) => {
    try {
      const response = await httpClient.get(`${apiUrl}/${resource}`, {
        params: { ids: ids.join(',') }
      });
      return { data: response.data };
    } catch (error: any) {
      openNotification({
        type: 'error',
        message: error,
        description: 'Error' || 'An unexpected error occurred',
      });
      throw error;
    }
  },

  getApiUrl: () => apiUrl,

  custom: async ({ url, method, payload, headers }) => {
    try {
      let axiosResponse;
      switch (method) {
        case 'put':
        case 'post':
        case 'patch':
          axiosResponse = await httpClient[method](url, payload, { headers });
          break;
        case 'delete':
          axiosResponse = await httpClient.delete(url, { data: payload, headers });
          break;
        default:
          axiosResponse = await httpClient.get(url, { headers });
          break;
      }

      const { data } = axiosResponse;
      return Promise.resolve({ data });
    } catch (error: any) {
      openNotification({
        type: 'error',
        message: error,
        description: 'Error' || 'An unexpected error occurred',
      });
      throw error;
    }
  },
});

export default customDataProvider;
