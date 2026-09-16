import { apiClient } from '@/lib/axios';
import { API_ENDPOINTS } from '@/api/endpoints';
import { IStudent } from '@/types';

export const studentService = {
  async getStudents(options?: { signal?: AbortSignal }) {
    const response = await apiClient.get<IStudent[]>(
      API_ENDPOINTS.STUDENTS.LIST,
      {
        signal: options?.signal,
      },
    );

    return response.data;
  },
};
