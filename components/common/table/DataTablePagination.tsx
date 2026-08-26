'use client';

import { ColumnFiltersState, Table } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { ListFilter } from 'lucide-react';
import { IStudent } from '@/types';
import { features } from './features';

interface IDataTableFilter {
  table: Table<typeof features, IStudent>;
  columnFilters: ColumnFiltersState;
}

export default function DataTableFilter({
  table,
  columnFilters,
}: IDataTableFilter) {
  const filterableColumns = table
    .getAllLeafColumns()
    .filter((column) => column.columnDef.enableColumnFilter === true);

  const activeFilterCount = columnFilters.length;

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button variant="outline" size="sm" className="h-9 gap-2 px-3">
            <ListFilter className="size-4" />

            <span>Bộ lọc</span>

            {activeFilterCount > 0 && (
              <span className="bg-primary text-primary-foreground flex size-5 items-center justify-center rounded-full text-[10px] font-semibold">
                {activeFilterCount}
              </span>
            )}
          </Button>
        }
      >
        Bộ lọc
      </PopoverTrigger>

      <PopoverContent align="end" sideOffset={8} className="w-[340px] p-0">
        {/* Header */}
        <div className="border-b px-4 py-3.5">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-semibold">Bộ lọc</h4>

              <p className="text-muted-foreground mt-0.5 text-xs">
                Lọc danh sách học sinh
              </p>
            </div>

            {activeFilterCount > 0 && (
              <span className="text-muted-foreground text-xs">
                {activeFilterCount} đang lọc
              </span>
            )}
          </div>
        </div>

        {/* Filter fields */}
        <div className="max-h-[360px] space-y-5 overflow-y-auto p-4">
          {filterableColumns.map((column) => {
            const filter = column.columnDef.meta?.filter;

            if (!filter || filter.type !== 'select') {
              return null;
            }

            const filterValue = column.getFilterValue();

            return (
              <div key={column.id} className="space-y-2">
                <label className="text-xs font-medium">
                  {column.columnDef.header as string}
                </label>

                <Select
                  value={filterValue != null ? String(filterValue) : ''}
                  onValueChange={(value) => {
                    const selectedOption = filter.options.find(
                      (option) => String(option.value) === value,
                    );

                    column.setFilterValue(selectedOption?.value);
                  }}
                >
                  <SelectTrigger className="h-9 w-full text-xs">
                    <SelectValue
                      placeholder={`Chọn ${column.columnDef.header}`}
                    />
                  </SelectTrigger>

                  <SelectContent>
                    {filter.options.map((option) => (
                      <SelectItem
                        key={String(option.value)}
                        value={String(option.value)}
                        className="text-xs"
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="bg-muted/30 flex items-center justify-end border-t px-4 py-3">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 text-xs"
            disabled={activeFilterCount === 0}
            onClick={() => {
              table.resetColumnFilters();
            }}
          >
            Xóa bộ lọc
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
