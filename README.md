# Next.js Starter

A scalable **Next.js 16** starter template built with **TypeScript**, **TanStack Query**, **Axios**, **Tailwind CSS**, **shadcn/ui**, and **MSW**.

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- shadcn/ui
- Axios
- TanStack Query
- MSW (Mock Service Worker)
- ESLint

---

# Project Structure

```text
src
├── api/
│   ├── endpoints.ts
│
├── lib/
│   └── react-query/
│   |    ├── query-client.ts
│   |    ├── query-keys.ts
│   |    ├── use-app-query.ts
│   |    └── use-app-mutation.ts
|   └── axios.ts
│
├── providers/
├── services/
├── mocks/
├── types/
├── features/
└── app/
```

---

# API Architecture

All API requests follow the same flow.

```text
Component
    │
    ▼
useAppQuery / useAppMutation
    │
    ▼
React Query
    │
    ▼
Service
    │
    ▼
Axios
    │
    ▼
Backend / MSW
```

Components should **never call Axios directly**.

---

# API Endpoints

All endpoints are defined in one place.

**File**

```text
src/api/endpoints.ts
```

Example:

```ts
export const API_ENDPOINTS = {
  USERS: {
    LIST: '/users',
    CREATE: '/users',
    DETAIL: (id: string) => `/users/${id}`,
    UPDATE: (id: string) => `/users/${id}`,
    DELETE: (id: string) => `/users/${id}`,
  },
};
```

---

# Services

Each resource should have its own service.

Example:

```text
src/services/user.service.ts
```

```ts
export const userService = {
  getUsers() {},
  getUser() {},
  createUser() {},
  updateUser() {},
  deleteUser() {},
};
```

A service is responsible for:

- Calling the API
- Returning `response.data`

A service should **not**:

- Manage loading state
- Handle UI logic
- Invalidate cache

---

## GET Request

```ts
async getUsers({
  params,
  signal,
}: {
  params?: UserParams;
  signal?: AbortSignal;
}) {
  const response = await apiClient.get<User[]>(
    API_ENDPOINTS.USERS.LIST,
    {
      params,
      signal,
    },
  );

  return response.data;
}
```

---

## POST Request

```ts
async createUser(data: CreateUserRequest) {
  const response = await apiClient.post<User>(
    API_ENDPOINTS.USERS.CREATE,
    data,
  );

  return response.data;
}
```

---

# Query Keys

All query keys are centralized.

**File**

```text
src/lib/react-query/query-keys.ts
```

Example:

```ts
export const QUERY_KEYS = {
  USERS: {
    ALL: ['users'],

    LIST: (params?: UserParams) => ['users', 'list', params],

    DETAIL: (id: string) => ['users', 'detail', id],
  },
};
```

Do not create query keys directly inside components.

---

# Fetching Data

Use `useAppQuery`.

## Basic Example

```ts
const { data, isPending } = useAppQuery(QUERY_KEYS.USERS.LIST(), ({ signal }) =>
  userService.getUsers({
    signal,
  }),
);
```

---

## With Query Parameters

```ts
const params = {
  page: 1,
  limit: 10,
  search: 'john',
};

const { data } = useAppQuery(QUERY_KEYS.USERS.LIST(params), ({ signal }) =>
  userService.getUsers({
    params,
    signal,
  }),
);
```

### Why pass `signal`?

React Query provides an `AbortSignal` to automatically cancel requests when:

- A component unmounts
- The query key changes
- A request becomes obsolete

Passing it to Axios prevents unnecessary network requests.

---

# Mutations

Use `useAppMutation`.

```ts
const { mutate, isPending } = useAppMutation(userService.createUser, {
  onSuccess(data) {
    console.log(data);
  },

  onError(error) {
    console.error(error);
  },
});
```

Execute:

```ts
mutate({
  name: 'John',
  email: 'john@example.com',
});
```

---

# Refreshing Cached Data

After a successful Create, Update or Delete operation, invalidate the related queries.

```ts
queryClient.invalidateQueries({
  queryKey: QUERY_KEYS.USERS.ALL,
});
```

Flow:

```text
Mutation
    │
    ▼
Success
    │
    ▼
Invalidate Query
    │
    ▼
React Query Refetch
    │
    ▼
UI Updated
```

---

# Mock API (MSW)

MSW is used during development to mock backend APIs.

Handlers:

```text
src/mocks/handlers.ts
```

Example:

```ts
http.get('/users', () => {
  return HttpResponse.json([
    {
      id: '1',
      name: 'John',
    },
  ]);
});
```

Benefits:

- Frontend development without backend
- Consistent mock data
- Easy testing of loading and error states

---

# Adding a New API

When adding a new resource (e.g. Products), follow these steps:

1. Add endpoints to `api/endpoints.ts`.
2. Create `product.service.ts`.
3. Add query keys to `query-keys.ts`.
4. Add MSW handlers (optional).
5. Use `useAppQuery` or `useAppMutation` inside components.

---

# Best Practices

✅ Define all endpoints in `endpoints.ts`

✅ Access APIs only through services

✅ Never call Axios directly inside components

✅ Use `useAppQuery` for fetching data

✅ Use `useAppMutation` for create/update/delete operations

✅ Store all query keys in `query-keys.ts`

✅ Invalidate related queries after successful mutations

---

# Future Improvements

Recommended additions for production projects:

- Axios Request/Response Interceptors
- Authentication & Refresh Token
- Global Error Handling
- Toast Notifications
- React Query Devtools
- Husky + lint-staged
- Environment Configuration
- Feature-based Module Structure
