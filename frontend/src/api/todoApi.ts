import type { TodoDto } from '#/types/todo';
import { apiSend, apiSendJson, jsonBody } from '#/utils/apiClient';

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

export function updateTodo(
  id: number,
  text: string,
  description: string | null,
): Promise<boolean> {
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
  return apiSend('/api/todos/reorder', 'Failed to reorder todos', jsonBody('PATCH', { orderedIds }));
}
