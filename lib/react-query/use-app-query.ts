import {
  useQuery,
  type QueryKey,
  type QueryFunctionContext,
  type UseQueryOptions,
  type UseQueryResult,
} from '@tanstack/react-query';

export function useAppQuery<
  TQueryKey extends QueryKey,
  TQueryFnData,
  TError = Error,
  TData = TQueryFnData,
>(
  queryKey: TQueryKey,
  queryFn: (context: QueryFunctionContext<TQueryKey>) => Promise<TQueryFnData>,
  options?: Omit<
    UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
    'queryKey' | 'queryFn'
  >,
): UseQueryResult<TData, TError> {
  return useQuery({
    queryKey,
    queryFn,
    ...options,
  });
}
