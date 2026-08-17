import { LayoutDashboard, Users, Layers, CreditCard } from 'lucide-react';
import type { ISidebarGroup } from '@/types';

import { ModuleType } from '@/types';

export const mainColor = {
  [ModuleType.STUDENT]: 'text-blue-500',
  [ModuleType.CLASS]: 'text-green-500',
  [ModuleType.PAYMENT]: 'text-purple-500',
};

// configs/breadcrumb.ts
export const breadcrumbMap: Record<string, string> = {
  students: 'Học sinh',
  classes: 'Lớp học',
  payments: 'Thanh toán',

  create: 'Tạo mới',
  edit: 'Chỉnh sửa',
  detail: 'Chi tiết',

  profile: 'Hồ sơ',
  settings: 'Cài đặt',
};

export const sidebarConfig: ISidebarGroup[] = [
  {
    label: 'TỔNG QUAN',
    items: [
      {
        title: 'Thống kê',
        href: '/',
        icon: LayoutDashboard,
      },
    ],
  },
  {
    label: 'QUẢN LÝ',
    items: [
      {
        title: 'Học sinh',
        href: '/students',
        icon: Users,
      },
      {
        title: 'Lớp học',
        href: '/classes',
        icon: Layers,
      },
    ],
  },
  {
    label: 'TÀI CHÍNH',
    items: [
      {
        title: 'Thanh toán',
        href: '/payments',
        icon: CreditCard,
      },
    ],
  },
];
