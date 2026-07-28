import { createFileRoute, redirect } from '@tanstack/react-router';
import { TodosPage } from '#/components/pages/TodosPage';
import { todoListsQueryOptions } from '#/services/api/todoListApi';
import type { TodoListDto } from '#/types/todoList';

export const Route = createFileRoute('/todos/')({
  loader: async ({ context }): Promise<TodoListDto[]> => {
    const lists = await context.queryClient.ensureQueryData(todoListsQueryOptions);
    if (lists.length > 0) {
      throw redirect({ to: '/todos/$listId', params: { listId: String(lists[0].id) } });
    }

    return lists;
  },
  component: TodosPage,
});
