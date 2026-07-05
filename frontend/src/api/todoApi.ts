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

export async function updateTodoDone(id: number, done: boolean): Promise<boolean> {
  const res = await apiFetch(`/api/todos/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ done }),
  });

  if (!res.ok) {
    await logFetchError(res, `Failed to update todo ${id}`);

    return false;
  }

  return true;
}
