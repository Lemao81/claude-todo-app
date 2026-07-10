import { redirect } from '@tanstack/react-router';
import type { TodoListDto } from '#/types/todoList';
import { apiSend, apiSendJson, jsonBody } from '#/utils/apiClient';
import { logFetchError } from '#/utils/logHelper';

export async function loadTodoLists(): Promise<TodoListDto[]> {
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

export function fetchTodoLists(): Promise<TodoListDto[] | null> {
  return apiSendJson<TodoListDto[]>('/api/todolists', 'Failed to fetch todo lists');
}

export function createTodoList(name: string): Promise<TodoListDto | null> {
  return apiSendJson<TodoListDto>(
    '/api/todolists',
    'Failed to create todo list',
    jsonBody('POST', { name }),
  );
}

export function updateTodoList(id: number, name: string): Promise<boolean> {
  return apiSend(
    `/api/todolists/${id}`,
    `Failed to update todo list ${id}`,
    jsonBody('PATCH', { name }),
  );
}

export function deleteTodoList(id: number): Promise<boolean> {
  return apiSend(`/api/todolists/${id}`, `Failed to delete todo list ${id}`, { method: 'DELETE' });
}
