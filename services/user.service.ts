import { apiClient } from '@/lib/axios';
import { API_ENDPOINTS } from '@/api/endpoints';
import type { User } from '@/types/user';

export const userService = {
  async getUsers(options?: {
    params?: {
      page?: number;
      limit?: number;
      search?: string;
    };
    signal?: AbortSignal;
  }) {
    const response = await apiClient.get<User[]>(API_ENDPOINTS.USERS.LIST, {
      params: options?.params,
      signal: options?.signal,
    });

    return response.data;
  },

  async getUser(
    id: string,
    options?: {
      signal?: AbortSignal;
    },
  ) {
    const response = await apiClient.get<User>(API_ENDPOINTS.USERS.DETAIL(id), {
      signal: options?.signal,
    });

    return response.data;
  },

  async createUser(data: User) {
    const response = await apiClient.post<User>(
      API_ENDPOINTS.USERS.CREATE,
      data,
    );

    return response.data;
  },

  async updateUser(id: string, data: Partial<User>) {
    const response = await apiClient.put<User>(
      API_ENDPOINTS.USERS.UPDATE(id),
      data,
    );

    return response.data;
  },

  async deleteUser(id: string) {
    await apiClient.delete(API_ENDPOINTS.USERS.DELETE(id));
  },
};
