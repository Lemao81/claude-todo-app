import type { TodoDto } from '#/types/todo';
import { apiFetch } from '#/utils/apiClient';
import { logFetchError } from '#/utils/logHelper';

export async function createTodo(
  text: string,
  description: string | null,
  todoListId: number,
): Promise<TodoDto> {
  const res = await apiFetch('/api/todos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, description, todoListId }),
  });

  if (!res.ok) {
    await logFetchError(res, 'Failed to create todo');

    throw new Error('Failed to create todo');
  }

  const todo: TodoDto = await res.json();

  return todo;
}
