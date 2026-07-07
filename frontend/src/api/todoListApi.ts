import { redirect } from '@tanstack/react-router';
import type { TodoListDto } from '#/types/todoList';
import { apiFetch } from '#/utils/apiClient';
import { logFetchError } from '#/utils/logHelper';

export async function fetchTodoLists(): Promise<TodoListDto[]> {
  const res = await fetch('/api/todolists');
  if (res.status === 401) {
    throw redirect({ to: '/login' });
  }

  if (!res.ok) {
    await logFetchError(res, 'Failed to fetch todo lists');

    throw new Error('Failed to fetch todo lists');
  }

  const lists: TodoListDto[] = await res.json();

  return lists;
}

export async function createTodoList(name: string): Promise<TodoListDto> {
  const res = await apiFetch('/api/todolists', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name }),
  });

  if (!res.ok) {
    await logFetchError(res, 'Failed to create todo list');

    throw new Error('Failed to create todo list');
  }

  const list: TodoListDto = await res.json();

  return list;
}

export async function deleteTodoList(id: number): Promise<boolean> {
  const res = await apiFetch(`/api/todolists/${id}`, { method: 'DELETE' });
  if (!res.ok) {
    await logFetchError(res, `Failed to delete todo list ${id}`);

    return false;
  }

  return true;
}
