import {
  tableFeatures,
  rowSelectionFeature,
  rowPaginationFeature,
  createPaginatedRowModel,
  createSortedRowModel,
  rowSortingFeature,
  sortFn_alphanumeric,
  columnFilteringFeature,
  globalFilteringFeature,
  createFilteredRowModel,
  filterFn_includesString,
} from '@tanstack/react-table';

export const features = tableFeatures({
  rowSelectionFeature,
  rowPaginationFeature,
  paginatedRowModel: createPaginatedRowModel(),
  rowSortingFeature, // enables sorting APIs and state
  columnFilteringFeature,
  globalFilteringFeature,
  filteredRowModel: createFilteredRowModel(),
  sortedRowModel: createSortedRowModel(),
  sortFns: {
    alphanumeric: sortFn_alphanumeric,
  },
  filterFns: { includesString: filterFn_includesString },
});
