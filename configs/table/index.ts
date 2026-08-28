import { ModuleType } from '@/types';

export const tableConfig = {
  [ModuleType.STUDENT]: {
    searchColumn: 'name',
    searchPlaceholder: 'Nhập tên học sinh',
  },

  [ModuleType.CLASS]: {
    searchColumn: 'name',
    searchPlaceholder: 'Nhập tên lớp',
  },

  [ModuleType.PAYMENT]: {
    searchColumn: 'studentName',
    searchPlaceholder: 'Nhập tên học sinh',
  },

  [ModuleType.DASHBOARD]: {
    searchColumn: 'name',
    searchPlaceholder: 'Tìm kiếm',
  },
} as const;
