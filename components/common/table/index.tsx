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
    phone: '0912345678',
    status: 'ACTIVE',
  },
  {
    id: 'ST002',
    name: 'Trần Hoàng Nam',
    classId: 'CLASS001',
    school: 'THPT Phủ Thông',
    grade: 10,
    parentName: 'Trần Văn Minh',
    phone: '0987654321',
    status: 'ACTIVE',
  },
  {
    id: 'ST003',
    name: 'Lê Thu Hà',
    classId: 'CLASS002',
    school: 'THPT Phủ Thông',
    grade: 11,
    parentName: 'Lê Văn Thành',
    phone: '0901234567',
    status: 'ACTIVE',
  },
  {
    id: 'ST004',
    name: 'Phạm Đức Anh',
    classId: 'CLASS002',
    school: 'THPT Phủ Thông',
    grade: 11,
    parentName: 'Phạm Văn Đức',
    phone: '0934567890',
    status: 'INACTIVE',
  },
  {
    id: 'ST005',
    name: 'Đỗ Ngọc Lan',
    classId: 'CLASS003',
    school: 'THPT Bắc Kạn',
    grade: 12,
    parentName: 'Đỗ Văn Nam',
    phone: '0961234567',
    status: 'ACTIVE',
  },
  {
    id: 'ST006',
    name: 'Vũ Quang Huy',
    classId: 'CLASS003',
    school: 'THPT Bắc Kạn',
    grade: 12,
    parentName: 'Vũ Văn Hoàng',
    phone: '0978123456',
    status: 'ACTIVE',
  },
  {
    id: 'ST007',
    name: 'Nguyễn Thùy Linh',
    classId: 'CLASS001',
    school: 'THPT Phủ Thông',
    grade: 10,
    parentName: 'Nguyễn Văn Long',
    phone: '0908765432',
    status: 'ACTIVE',
  },
  {
    id: 'ST008',
    name: 'Hoàng Gia Bảo',
    classId: 'CLASS002',
    school: 'THPT Phủ Thông',
    grade: 11,
    parentName: 'Hoàng Văn Bình',
    phone: '0918765432',
    status: 'INACTIVE',
  },
  {
    id: 'ST009',
    name: 'Bùi Khánh Linh',
    classId: 'CLASS003',
    school: 'THPT Bắc Kạn',
    grade: 12,
    parentName: 'Bùi Văn Nam',
    phone: '0945678123',
    status: 'ACTIVE',
  },
  {
    id: 'ST010',
    name: 'Phan Đức Minh',
    classId: 'CLASS001',
    school: 'THPT Phủ Thông',
    grade: 10,
    parentName: 'Phan Văn Hùng',
    phone: '0981234567',
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
    <div className="bg-background w-full overflow-hidden rounded-xl border">
      {/* Table */}
      <div className="w-full max-w-full overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted/40">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b transition-colors">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="text-muted-foreground h-11 px-4 text-left align-middle font-medium whitespace-nowrap"
                  >
                    {header.isPlaceholder ? null : (
                      <table.FlexRender header={header} />
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className="hover:bg-muted/30 data-[state=selected]:bg-muted/50 border-b transition-colors"
                >
                  {row.getAllCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-4 py-3 align-middle whitespace-nowrap"
                    >
                      <table.FlexRender cell={cell} />
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-muted-foreground h-32 text-center"
                >
                  Không có dữ liệu.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="bg-background flex w-full items-center justify-between border-t px-4 py-3">
        <div className="text-muted-foreground text-sm">
          Trang{' '}
          <span className="text-foreground font-medium">
            {pagination.pageIndex + 1}
          </span>
        </div>

        <div className="flex items-center gap-2">
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
    </div>
  );
}
