// configs/sidebar.ts
import { LayoutDashboard, Users, Layers, CreditCard } from 'lucide-react';

import type { ISidebarGroup } from '@/types';

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
