import { AxiosInstance } from 'axios';
import { DataProvider, OpenNotificationParams } from '@refinedev/core';
import { axiosInstance, generateSort, generateFilter } from '@/utility';
import { initMockData } from '@/mocks/mocks';
import { formatResourceName } from '@/utility/helper/common';

const mockDataProvider = (
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

      // Convert the resource name to the key used in mockData
      const key = formatResourceName(resource, "getList")
      // Access the mock data dynamically
      const response = initMockData[key];

      return {
        data: response?.data?.data || response?.data,
        // total: parseInt(response.headers['x-total-count'], 10),
        total: response?.data?.total_rows || 0,
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
      // Convert the resource name to the key used in mockData
      const key = formatResourceName(resource, "getOne")
      // Access the mock data dynamically
      const response = initMockData[key];

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
    // Convert the resource name to the key used in mockData
    const key = formatResourceName(resource, "create")
    // Access the mock data dynamically
    const response = initMockData[key];

    openNotification({
      type: 'success',
      message: response.data.message,
      description: 'Success',
    });

    return { data: response.data };
  },

  update: async ({ resource, id, variables }) => {
    const updatedResource = resource.replace(':id', id.toString());

    try {
      // Convert the resource name to the key used in mockData
      const key = formatResourceName(resource, "update")
      // Access the mock data dynamically
      const response = initMockData[key];

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
      // Convert the resource name to the key used in mockData
      const key = formatResourceName(resource, "deleteOne")
      // Access the mock data dynamically
      const response = initMockData[key];

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
      // Convert the resource name to the key used in mockData
      const key = formatResourceName(resource, "getMany")
      // Access the mock data dynamically
      const response = initMockData[key];
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


export default mockDataProvider;
