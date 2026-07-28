import { createFileRoute } from '@tanstack/react-router';
import { createTodosQueryOptions } from '#/services/api/todoApi';
import { createTodoListQueryOptions } from '#/services/api/todoListApi';

export const Route = createFileRoute('/todos/$listId')({
  loader: async ({ context, params }): Promise<void> => {
    const listId = Number(params.listId);
    await Promise.all([
      context.queryClient.ensureQueryData(createTodoListQueryOptions(listId)),
      context.queryClient.ensureQueryData(createTodosQueryOptions(listId)),
    ]);
  },
});
