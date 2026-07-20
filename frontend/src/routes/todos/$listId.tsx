import { createFileRoute } from '@tanstack/react-router';
import { todosQueryOptions } from '#/services/api/todoApi';
import { todoListQueryOptions } from '#/services/api/todoListApi';

export const Route = createFileRoute('/todos/$listId')({
  loader: async ({ context, params }): Promise<void> => {
    const listId = Number(params.listId);
    await Promise.all([
      context.queryClient.ensureQueryData(todoListQueryOptions(listId)),
      context.queryClient.ensureQueryData(todosQueryOptions(listId)),
    ]);
  },
});
