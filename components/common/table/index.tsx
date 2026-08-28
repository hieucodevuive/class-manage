'use client';
import {
  ColumnFiltersState,
  RowSelectionState,
  useTable,
} from '@tanstack/react-table';
import { features } from './features';
import { Button } from '@/components/ui/button';

import type { ModuleDataMap } from '@/types';
import { createActionsColumn, createSelectionColumn } from './columns';
import { useState } from 'react';
import CButton from '../CButton';

import {
  ArrowDown,
  ArrowUp,
  ChevronsUpDown,
  FileSpreadsheet,
  Trash2,
} from 'lucide-react';
import { cn, getTableColumns } from '@/lib/utils';
import { SearchInput } from '../SearchInput';
import DataTableFilter from './DataTableFilter';
import { tableConfig } from '@/configs/table';

interface IDataTable<T extends keyof ModuleDataMap> {
  moduleType: T;
  tableData: ModuleDataMap[T][];
}

export default function DataTable<T extends keyof ModuleDataMap>({
  moduleType,
  tableData,
}: IDataTable<T>) {
  const config = tableConfig[moduleType];
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 50,
  });

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const moduleColumns = getTableColumns(moduleType);

  const selectionColumn = createSelectionColumn<ModuleDataMap[T]>();
  const actionsColumn = createActionsColumn<ModuleDataMap[T]>();

  const columns = [selectionColumn, ...moduleColumns, actionsColumn];

  const table = useTable({
    key: `${moduleType}-table`,
    features,
    columns,
    data: tableData,

    onRowSelectionChange: setRowSelection,

    onPaginationChange: setPagination,

    state: {
      rowSelection,
      pagination,
      columnFilters,
    },

    onColumnFiltersChange: setColumnFilters,

    getRowId: (row) => row.id,
  });

  return (
    <div className="bg-background w-full overflow-hidden rounded-xl border">
      {/* Search + Filter */}
      <div className="flex h-15 w-full items-center justify-between border-b px-4 py-4">
        {/* Search name */}
        <SearchInput
          className="max-w-80 bg-gray-50 text-[12px]!"
          placeholder={config.searchPlaceholder}
          value={
            (table
              .getColumn(config.searchColumn)
              ?.getFilterValue() as string) ?? ''
          }
          onChange={(e) => {
            table
              .getColumn(config.searchColumn)
              ?.setFilterValue(e.target.value);
          }}
        />

        <DataTableFilter table={table} columnFilters={columnFilters} />
      </div>

      {/* Selected actions */}
      {Object.keys(rowSelection).length > 0 && (
        <div className="flex h-10 w-full items-center justify-between bg-blue-100 px-4">
          <div className="text-[12px]">
            Chọn <strong>{Object.keys(rowSelection).length}</strong>
          </div>

          <div className="flex gap-2">
            <CButton
              text="Tạo Excel"
              variant="ghost"
              className="hover:none cursor-pointer text-[12px]"
              icon={<FileSpreadsheet />}
            />

            <CButton
              text="Xóa"
              variant="ghost"
              className="hover:none cursor-pointer text-[12px] text-red-500"
              icon={<Trash2 />}
            />
          </div>
        </div>
      )}

      {/* Table */}
      <div className="w-full max-w-full overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted/40">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b transition-colors">
                {headerGroup.headers.map((header) => {
                  const sorted = header.column.getIsSorted();
                  const canSort = header.column.getCanSort();

                  return (
                    <th
                      key={header.id}
                      onClick={
                        canSort
                          ? header.column.getToggleSortingHandler()
                          : undefined
                      }
                      className={cn(
                        'text-muted-foreground h-11 px-4 text-left align-middle font-medium whitespace-nowrap',
                        canSort &&
                          'hover:bg-muted/60 cursor-pointer select-none',
                      )}
                    >
                      {header.isPlaceholder ? null : (
                        <div className="flex items-center gap-2">
                          <table.FlexRender header={header} />

                          {canSort && (
                            <span className="text-muted-foreground">
                              {sorted === 'asc' ? (
                                <ArrowUp className="size-4" />
                              ) : sorted === 'desc' ? (
                                <ArrowDown className="size-4" />
                              ) : (
                                <ChevronsUpDown className="size-4 opacity-50" />
                              )}
                            </span>
                          )}
                        </div>
                      )}
                    </th>
                  );
                })}
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
