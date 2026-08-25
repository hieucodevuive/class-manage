import {
  tableFeatures,
  rowSelectionFeature,
  rowPaginationFeature,
  createPaginatedRowModel,
  createSortedRowModel,
  rowSortingFeature,
  sortFn_alphanumeric,
} from '@tanstack/react-table';

export const features = tableFeatures({
  rowSelectionFeature,
  rowPaginationFeature,
  paginatedRowModel: createPaginatedRowModel(),
  rowSortingFeature, // enables sorting APIs and state
  sortedRowModel: createSortedRowModel(), // client-side sorting
  sortFns: {
    alphanumeric: sortFn_alphanumeric,
  },
});
