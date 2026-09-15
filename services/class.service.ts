import { apiClient } from '@/lib/axios';
import { API_ENDPOINTS } from '@/api/endpoints';
import { IClass } from '@/types';

export const classService = {
  async getClasses(options?: { signal?: AbortSignal }) {
    const response = await apiClient.get<IClass[]>(API_ENDPOINTS.CLASSES.LIST, {
      signal: options?.signal,
    });

    return response.data;
  },
};
