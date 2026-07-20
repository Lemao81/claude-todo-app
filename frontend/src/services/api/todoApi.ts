import { queryOptions } from '@tanstack/react-query';
import type { TodoDto } from '#/types/todo';
import { apiGetJson, apiSend, apiSendJson, jsonBody, shouldRetryQuery } from '#/utils/apiClient';

export const allTodosQueryOptions = queryOptions({
  queryKey: ['todos'],
  queryFn: (): Promise<TodoDto[]> => apiGetJson<TodoDto[]>('/api/todos', 'Failed to fetch todos'),
  retry: shouldRetryQuery,
});

export const todosQueryOptions = (todoListId: number) =>
  queryOptions({
    queryKey: ['todos', todoListId],
    queryFn: (): Promise<TodoDto[]> =>
      apiGetJson<TodoDto[]>(`/api/todos?todoListId=${todoListId}`, 'Failed to fetch todos'),
  });

export function createTodo(
  text: string,
  description: string | null,
  todoListId: number,
): Promise<TodoDto | null> {
  return apiSendJson<TodoDto>(
    '/api/todos',
    'Failed to create todo',
    jsonBody('POST', { text, description, todoListId }),
  );
}

export function updateTodoDone(id: number, done: boolean): Promise<boolean> {
  return apiSend(`/api/todos/${id}`, `Failed to update todo ${id}`, jsonBody('PATCH', { done }));
}

export function updateTodo(id: number, text: string, description: string | null): Promise<boolean> {
  return apiSend(
    `/api/todos/${id}`,
    `Failed to update todo ${id}`,
    jsonBody('PATCH', { text, description }),
  );
}

export function deleteTodo(id: number): Promise<boolean> {
  return apiSend(`/api/todos/${id}`, `Failed to delete todo ${id}`, { method: 'DELETE' });
}

export function reorderTodos(orderedIds: number[]): Promise<boolean> {
  return apiSend(
    '/api/todos/reorder',
    'Failed to reorder todos',
    jsonBody('PATCH', { orderedIds }),
  );
}
