import { createFileRoute, redirect } from '@tanstack/react-router';
import type { TodoListDto } from '#/types/todoList';
import { logFetchError } from '#/utils/logHelper';

export const Route = createFileRoute('/todos/')({
  loader: async (): Promise<TodoListDto[]> => {
    const res = await fetch('/api/todolists');
    if (res.status === 401) {
      throw redirect({ to: '/login' });
    }

    if (!res.ok) {
      await logFetchError(res, 'Failed to fetch todo lists');

      throw new Error('Failed to fetch todo lists');
    }

    const lists: TodoListDto[] = await res.json();
    if (lists.length > 0) {
      throw redirect({ to: '/todos/$listId', params: { listId: String(lists[0].id) } });
    }

    return lists;
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <div style={{ maxWidth: 640 }}>No todo lists yet.</div>;
}
