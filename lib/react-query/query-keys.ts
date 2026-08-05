export const QUERY_KEYS = {
  USERS: {
    LIST: ['users'] as const,
    DETAIL: (id: string) => ['users', id] as const,
  },
} as const;
