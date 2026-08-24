import {
  tableFeatures,
  rowSelectionFeature,
  rowPaginationFeature,
  createPaginatedRowModel,
} from '@tanstack/react-table';

export const features = tableFeatures({
  rowSelectionFeature,
  rowPaginationFeature,
  paginatedRowModel: createPaginatedRowModel(),
});
