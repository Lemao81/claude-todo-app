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
      const body = await res.text();
      console.error(`Failed to fetch todos: ${res.status} ${res.statusText}`, body);

      throw new Error('Failed to fetch todos');
    }

    return res.json();
  },
});
