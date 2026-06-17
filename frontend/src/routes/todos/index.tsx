import { createFileRoute } from '@tanstack/react-router';
import { apiFetch } from '#/utils/apiClient';
import { logFetchError } from '#/utils/logHelper';

export type TodoDto = {
  id: number;
  text: string;
  done: boolean;
  description: string | null;
};

export const Route = createFileRoute('/todos/')({
  loader: async (): Promise<TodoDto[]> => {
    const res = await apiFetch('/api/todos');
    if (!res.ok) {
      await logFetchError(res, 'Failed to fetch todos');

      throw new Error('Failed to fetch todos');
    }

    return res.json();
  },
});
