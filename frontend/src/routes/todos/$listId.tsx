import { createFileRoute, redirect } from '@tanstack/react-router';
import type { TodoDto } from '#/types/todo';
import type { TodoListDto } from '#/types/todoList';
import { logFetchError } from '#/utils/logHelper';

type ListTodosData = {
  list: TodoListDto;
  todos: TodoDto[];
};

export const Route = createFileRoute('/todos/$listId')({
  loader: async ({ params }): Promise<ListTodosData> => {
    const [listRes, todosRes] = await Promise.all([
      fetch(`/api/todolists/${params.listId}`),
      fetch(`/api/todos?todoListId=${params.listId}`),
    ]);

    if (listRes.status === 401 || todosRes.status === 401) {
      throw redirect({ to: '/login' });
    }

    if (!listRes.ok) {
      await logFetchError(listRes, 'Failed to fetch todo list');

      throw new Error('Failed to fetch todo list');
    }

    if (!todosRes.ok) {
      await logFetchError(todosRes, 'Failed to fetch todos');

      throw new Error('Failed to fetch todos');
    }

    return { list: await listRes.json(), todos: await todosRes.json() };
  },
});
