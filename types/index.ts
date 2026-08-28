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

export enum ClassStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  COMPLETED = 'COMPLETED',
}

export interface IClass {
  id: string;

  // Thông tin lớp
  name: string;
  code: string;
  description?: string;

  // Thông tin học tập
  subject: string;
  grade: number;

  // Lịch học
  schedule: string;
  startDate: string;
  endDate?: string;

  // Học phí
  pricePerSession: number;

  // Sĩ số
  maxStudents: number;
  studentCount: number;

  // Trạng thái
  status: ClassStatus;
}

export type ModuleDataMap = {
  [ModuleType.STUDENT]: IStudent;
  [ModuleType.CLASS]: IClass;
  // [ModuleType.PAYMENT]: IPayment;
  // [ModuleType.DASHBOARD]: IDashboard;
};

export type ModuleTypeKey = keyof ModuleDataMap;
