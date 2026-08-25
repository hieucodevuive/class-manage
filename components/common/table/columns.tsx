import { IStudent, ModuleType, StudentStatus } from '@/types';
import { features } from './features';
import type { ColumnDef, RowData } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';
import DataTableActions from './DataTableActions';

export const studentColumns: Array<ColumnDef<typeof features, IStudent>> = [
  {
    accessorKey: 'name',
    header: 'Tên',
    sortFn: 'alphanumeric',
  },

  {
    accessorKey: 'classId',
    header: 'Lớp',
  },

  {
    accessorKey: 'school',
    header: 'Trường',
    enableSorting: false,
  },

  {
    accessorKey: 'grade',
    header: 'Khối',
  },

  {
    accessorKey: 'parentName',
    header: 'Phụ huynh',
  },

  {
    accessorKey: 'phone',
    header: 'SDT',
    enableSorting: false,
  },

  {
    accessorKey: 'status',
    header: 'Trạng thái',
    enableSorting: false,
    cell: (info) => {
      const status = info.getValue<StudentStatus>();

      return <span>{status === 'ACTIVE' ? 'Đang học' : 'Đã nghỉ'}</span>;
    },
  },
];

export const tableColumns = {
  [ModuleType.STUDENT]: studentColumns,
  [ModuleType.CLASS]: studentColumns,
  [ModuleType.PAYMENT]: studentColumns,
  [ModuleType.DASHBOARD]: studentColumns,
} as const;

export function createSelectionColumn<TData extends RowData>(): ColumnDef<
  typeof features,
  TData
> {
  return {
    id: 'select',

    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllRowsSelected()}
        onCheckedChange={(value) => {
          table.toggleAllRowsSelected(!!value);
        }}
        aria-label="Chọn tất cả"
      />
    ),

    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => {
          row.toggleSelected(!!value);
        }}
        aria-label="Chọn dòng"
      />
    ),
  };
}

export function createActionsColumn<TData extends RowData>(): ColumnDef<
  typeof features,
  TData
> {
  return {
    id: 'actions',
    header: 'Thao tác',
    cell: ({ row }) => {
      const data = row.original;

      return (
        <DataTableActions
          onView={() => {
            console.log('View:', data);
          }}
          onEdit={() => {
            console.log('Edit:', data);
          }}
          onDelete={() => {
            console.log('Delete:', data);
          }}
        />
      );
    },
  };
}
