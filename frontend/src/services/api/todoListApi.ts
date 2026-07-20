import { queryOptions } from '@tanstack/react-query';
import type { TodoListDto } from '#/types/todoList';
import { apiGetJson, apiSend, apiSendJson, jsonBody } from '#/utils/apiClient';

export const todoListsQueryOptions = queryOptions({
  queryKey: ['todoLists'],
  queryFn: (): Promise<TodoListDto[]> =>
    apiGetJson<TodoListDto[]>('/api/todolists', 'Failed to fetch todo lists'),
});

export const todoListQueryOptions = (id: number) =>
  queryOptions({
    queryKey: ['todoLists', id],
    queryFn: (): Promise<TodoListDto> =>
      apiGetJson<TodoListDto>(`/api/todolists/${id}`, 'Failed to fetch todo list'),
  });

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
