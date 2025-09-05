
import type { AxiosResponse, AxiosRequestConfig } from 'axios';
import apiClient from './apiClient';

/**
 * Base API client class that provides common HTTP methods
 * Can be extended by specific API services
 */
export class RequestBase {
  /**
   * GET request
   * @param url - Request URL
   * @param config - Axios request configuration
   */
  protected async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await apiClient.get(url, config);
    return response.data;
  }

  /**
   * POST request
   * @param url - Request URL
   * @param data - Request data
   * @param config - Axios request configuration
   */
  protected async post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response: AxiosResponse<T> = await apiClient.post(url, data, config);
    return response.data;
  }

  /**
   * PUT request
   * @param url - Request URL
   * @param data - Request data
   * @param config - Axios request configuration
   */
  protected async put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response: AxiosResponse<T> = await apiClient.put(url, data, config);
    return response.data;
  }

  /**
   * DELETE request
   * @param url - Request URL
   * @param config - Axios request configuration
   */
  protected async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await apiClient.delete(url, config);
    return response.data;
  }
}

// Legacy httpClient object for backward compatibility
export const httpClient = {
  /**
   * GET request
   * @param url - Request URL
   * @param config - Axios request configuration
   */
  get: async <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const response: AxiosResponse<T> = await apiClient.get(url, config);
    return response.data;
  },

  /**
   * POST request
   * @param url - Request URL
   * @param data - Request data
   * @param config - Axios request configuration
   */
  post: async <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const response: AxiosResponse<T> = await apiClient.post(url, data, config);
    return response.data;
  },

  /**
   * PUT request
   * @param url - Request URL
   * @param data - Request data
   * @param config - Axios request configuration
   */
  put: async <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    const response: AxiosResponse<T> = await apiClient.put(url, data, config);
    return response.data;
  },

  /**
   * DELETE request
   * @param url - Request URL
   * @param config - Axios request configuration
   */
  delete: async <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const response: AxiosResponse<T> = await apiClient.delete(url, config);
    return response.data;
  },
};

export default httpClient;
