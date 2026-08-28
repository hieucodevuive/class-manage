import {
  ClassStatus,
  IClass,
  IStudent,
  ModuleType,
  StudentStatus,
} from '@/types';
import { features } from './features';
import type { ColumnDef, RowData } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';
import DataTableActions from './DataTableActions';

export const studentColumns: Array<ColumnDef<typeof features, IStudent>> = [
  {
    accessorKey: 'name',
    header: 'Tên',
    sortFn: 'alphanumeric',
    filterFn: 'includesString',
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
    enableColumnFilter: true,
    filterFn: 'equals',
    meta: {
      filter: {
        type: 'select',
        options: [
          { label: 'Khối 10', value: 10 },
          { label: 'Khối 11', value: 11 },
          { label: 'Khối 12', value: 12 },
        ],
      },
    },
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
    filterFn: 'equals',
    cell: (info) => {
      const status = info.getValue<StudentStatus>();

      return <span>{status === 'ACTIVE' ? 'Đang học' : 'Đã nghỉ'}</span>;
    },
    meta: {
      filter: {
        type: 'select',
        options: [
          { label: 'Đang học', value: 'ACTIVE' },
          { label: 'Đã nghỉ', value: 'INACTIVE' },
        ],
      },
    },
    enableColumnFilter: true,
  },
];

export const classColumns: Array<ColumnDef<typeof features, IClass>> = [
  {
    accessorKey: 'name',
    header: 'Tên lớp',
    sortFn: 'alphanumeric',
    filterFn: 'includesString',
  },

  {
    accessorKey: 'code',
    header: 'Mã lớp',
    sortFn: 'alphanumeric',
  },

  {
    accessorKey: 'subject',
    header: 'Môn',
    enableSorting: false,
  },

  {
    accessorKey: 'grade',
    header: 'Khối',
    enableColumnFilter: true,
    filterFn: 'equals',
    meta: {
      filter: {
        type: 'select',
        options: [
          { label: 'Khối 10', value: 10 },
          { label: 'Khối 11', value: 11 },
          { label: 'Khối 12', value: 12 },
        ],
      },
    },
  },

  {
    accessorKey: 'schedule',
    header: 'Lịch học',
    enableSorting: false,
  },

  {
    accessorKey: 'pricePerSession',
    header: 'Giá / buổi',
    cell: (info) => {
      const price = info.getValue<number>();

      return `${price.toLocaleString('vi-VN')}đ`;
    },
  },

  {
    accessorKey: 'studentCount',
    header: 'Sĩ số',
    cell: (info) => {
      const count = info.getValue<number>();
      const row = info.row.original;

      return `${count}/${row.maxStudents}`;
    },
  },

  {
    accessorKey: 'status',
    header: 'Trạng thái',
    enableSorting: false,
    filterFn: 'equals',
    cell: (info) => {
      const status = info.getValue<ClassStatus>();

      return (
        <span>
          {status === 'ACTIVE'
            ? 'Đang học'
            : status === 'COMPLETED'
              ? 'Đã kết thúc'
              : 'Tạm dừng'}
        </span>
      );
    },
    meta: {
      filter: {
        type: 'select',
        options: [
          { label: 'Đang học', value: 'ACTIVE' },
          { label: 'Tạm dừng', value: 'INACTIVE' },
          { label: 'Đã kết thúc', value: 'COMPLETED' },
        ],
      },
    },
    enableColumnFilter: true,
  },
];

export const tableColumns = {
  [ModuleType.STUDENT]: studentColumns,
  [ModuleType.CLASS]: classColumns,
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
