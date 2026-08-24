'use client';
import { RowSelectionState, useTable } from '@tanstack/react-table';
import { features } from './features';
import { ModuleType } from '@/types';
import { Button } from '@/components/ui/button';

import type { IStudent } from '@/types';
import {
  createActionsColumn,
  createSelectionColumn,
  tableColumns,
} from './columns';
import { useState } from 'react';

export const students: IStudent[] = [
  {
    id: 'ST001',
    name: 'Nguyễn Minh Anh',
    classId: 'CLASS001',
    school: 'THPT Phủ Thông',
    grade: 10,
    parentName: 'Nguyễn Văn Hùng',
    parentPhone: '0912345678',
    status: 'ACTIVE',
  },
  {
    id: 'ST002',
    name: 'Trần Hoàng Nam',
    classId: 'CLASS001',
    school: 'THPT Phủ Thông',
    grade: 10,
    parentName: 'Trần Văn Minh',
    parentPhone: '0987654321',
    status: 'ACTIVE',
  },
  {
    id: 'ST003',
    name: 'Lê Thu Hà',
    classId: 'CLASS002',
    school: 'THPT Phủ Thông',
    grade: 11,
    parentName: 'Lê Văn Thành',
    parentPhone: '0901234567',
    status: 'ACTIVE',
  },
  {
    id: 'ST004',
    name: 'Phạm Đức Anh',
    classId: 'CLASS002',
    school: 'THPT Phủ Thông',
    grade: 11,
    parentName: 'Phạm Văn Đức',
    parentPhone: '0934567890',
    status: 'INACTIVE',
  },
  {
    id: 'ST005',
    name: 'Đỗ Ngọc Lan',
    classId: 'CLASS003',
    school: 'THPT Bắc Kạn',
    grade: 12,
    parentName: 'Đỗ Văn Nam',
    parentPhone: '0961234567',
    status: 'ACTIVE',
  },
  {
    id: 'ST006',
    name: 'Vũ Quang Huy',
    classId: 'CLASS003',
    school: 'THPT Bắc Kạn',
    grade: 12,
    parentName: 'Vũ Văn Hoàng',
    parentPhone: '0978123456',
    status: 'ACTIVE',
  },
  {
    id: 'ST007',
    name: 'Nguyễn Thùy Linh',
    classId: 'CLASS001',
    school: 'THPT Phủ Thông',
    grade: 10,
    parentName: 'Nguyễn Văn Long',
    parentPhone: '0908765432',
    status: 'ACTIVE',
  },
  {
    id: 'ST008',
    name: 'Hoàng Gia Bảo',
    classId: 'CLASS002',
    school: 'THPT Phủ Thông',
    grade: 11,
    parentName: 'Hoàng Văn Bình',
    parentPhone: '0918765432',
    status: 'INACTIVE',
  },
  {
    id: 'ST009',
    name: 'Bùi Khánh Linh',
    classId: 'CLASS003',
    school: 'THPT Bắc Kạn',
    grade: 12,
    parentName: 'Bùi Văn Nam',
    parentPhone: '0945678123',
    status: 'ACTIVE',
  },
  {
    id: 'ST010',
    name: 'Phan Đức Minh',
    classId: 'CLASS001',
    school: 'THPT Phủ Thông',
    grade: 10,
    parentName: 'Phan Văn Hùng',
    parentPhone: '0981234567',
    status: 'ACTIVE',
  },
];

interface IDataTable {
  moduleType: ModuleType;
}

export default function DataTable({ moduleType }: IDataTable) {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 50,
  });

  const moduleColumns = tableColumns[moduleType];
  const selectionColumn = createSelectionColumn<IStudent>();
  const actionsColumn = createActionsColumn<IStudent>();

  const columns = [selectionColumn, ...moduleColumns, actionsColumn];

  const data = students;

  const table = useTable({
    key: `${moduleType}-table`, // needed for devtools, omit if you don't want to use the devtools
    features,
    columns,
    data,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    state: {
      rowSelection,
      pagination,
    },
    getRowId: (row) => row.id,
  });
  return (
    <>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder ? null : (
                    <table.FlexRender header={header} />
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getAllCells().map((cell) => (
                <td key={cell.id}>
                  <table.FlexRender cell={cell} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex items-center justify-between py-4">
        <span className="text-muted-foreground text-sm">
          Trang {pagination.pageIndex + 1}
        </span>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Trước
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Sau
          </Button>
        </div>
      </div>
    </>
  );
}
