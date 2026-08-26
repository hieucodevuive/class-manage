import '@tanstack/react-table';

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData, TValue> {
    filter?: {
      type: 'select';
      options: {
        label: string;
        value: string | number;
      }[];
    };
  }
}
