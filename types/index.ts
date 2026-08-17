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
  STUDENT,
  CLASS,
  PAYMENT,
}
