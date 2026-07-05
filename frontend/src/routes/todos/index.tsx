import { createFileRoute, redirect } from '@tanstack/react-router';
import { fetchTodoLists } from '#/api/todoListApi';
import type { TodoListDto } from '#/types/todoList';

export const Route = createFileRoute('/todos/')({
  loader: async (): Promise<TodoListDto[]> => {
    const lists = await fetchTodoLists();
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
