export const QUERY_KEYS = {
  USERS: {
    ALL: ['users'],

    LIST: (params?: { page?: number; limit?: number; search?: string }) => [
      'users',
      'list',
      params,
    ],
  },
};
