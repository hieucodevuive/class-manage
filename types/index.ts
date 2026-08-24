import type { LucideIcon } from 'lucide-react';

export interface ISidebarItem {
  title: string;
  href: string;
  icon: LucideIcon;
}

export interface ISidebarGroup {
  label: string;
  items: ISidebarItem[];
}

export enum ModuleType {
  STUDENT = 'STUDENT',
  CLASS = 'CLASS',
  PAYMENT = 'PAYMENT',
  DASHBOARD = 'DASHBOARD',
}

export type StudentStatus = 'ACTIVE' | 'INACTIVE';
export interface IStudent {
  id: string;
  name: string;

  // Thông tin học sinh ở trường
  school: string;
  grade: number;

  // Thông tin phụ huynh
  parentName: string;
  phone: string;

  // Lớp học tại trung tâm
  classId: string;

  status: StudentStatus;
}
