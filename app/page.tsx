'use client';

import { userService } from '@/services/user.service';
import { useAppQuery } from '@/lib/react-query/use-app-query';
import { QUERY_KEYS } from '@/lib/react-query/query-keys';
import { useAppMutation } from '@/lib/react-query/use-app-mutation';
import { queryClient } from '@/lib/react-query/query-client';

export default function Home() {
  const params = {
    page: 1,
    limit: 10,
    search: 'hieu',
  };

  const { data, isPending } = useAppQuery(QUERY_KEYS.USERS.LIST(params), () =>
    userService.getUsers({
      params,
    }),
  );

  const { mutate, isPending: isCreating } = useAppMutation(
    userService.createUser,
    {
      onSuccess(data) {
        console.log('create success:', data);

        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.USERS.ALL,
        });
      },

      onError(error) {
        console.log('create error:', error);
      },
    },
  );

  function handleCreate() {
    mutate({
      id: crypto.randomUUID(),
      name: 'New User',
      email: 'new@gmail.com',
    });
  }

  if (isPending || isCreating) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <button disabled={isPending} onClick={handleCreate}>
        {isPending ? 'Creating...' : 'Create User'}
      </button>

      {data?.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}
