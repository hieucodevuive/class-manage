import { tableColumns } from '@/components/common/table/columns';
import { features } from '@/components/common/table/features';
import { ModuleDataMap } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getTableColumns<T extends keyof ModuleDataMap>(
  moduleType: T,
): ColumnDef<typeof features, ModuleDataMap[T]>[] {
  return tableColumns[moduleType] as ColumnDef<
    typeof features,
    ModuleDataMap[T]
  >[];
}
