import { createFileRoute } from '@tanstack/react-router';

export type TodoDto = {
  id: number;
  text: string;
  done: boolean;
  description: string | null;
};

export const Route = createFileRoute('/todos/')({
  loader: async (): Promise<TodoDto[]> => {
    const res = await fetch('/api/todos');
    if (!res.ok) {
      throw new Error('Failed to fetch todos');
    }

    return res.json();
  },
});
