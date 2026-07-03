import { createLazyFileRoute, getRouteApi } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { AddTodoDialog } from '#/components/AddTodoDialog';
import { TodoList } from '#/components/TodoList';
import { TodoListHeader } from '#/components/TodoListHeader';
import type { TodoDto } from '#/types/todo';
import { apiFetch } from '#/utils/apiClient';
import { logFetchError } from '#/utils/logHelper';

export const Route = createLazyFileRoute('/todos/$listId')({
  component: RouteComponent,
});

const routeApi = getRouteApi('/todos/$listId');

function RouteComponent() {
  const { listId } = routeApi.useParams();
  const { list, todos: loadedTodos } = routeApi.useLoaderData();
  const [todos, setTodos] = useState<TodoDto[]>(loadedTodos);
  const [showDone, setShowDone] = useState(true);
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  useEffect(() => setTodos(loadedTodos), [loadedTodos]);

  async function handleToggleDone(id: number, done: boolean) {
    setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, done } : todo)));

    const res = await apiFetch(`/api/todos/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ done }),
    });

    if (!res.ok) {
      await logFetchError(res, `Failed to update todo ${id}`);

      setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, done: !done } : todo)));
    }
  }

  async function handleCreate(text: string, description: string | null) {
    const res = await apiFetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, description, todoListId: Number(listId) }),
    });

    if (!res.ok) {
      await logFetchError(res, 'Failed to create todo');

      throw new Error('Failed to create todo');
    }

    const todo: TodoDto = await res.json();
    setTodos((prev) => [...prev, todo]);
  }

  return (
    <div style={{ maxWidth: 640 }}>
      <TodoListHeader
        listName={list.name}
        showDone={showDone}
        onShowDoneChange={setShowDone}
        onAddClick={() => setAddDialogOpen(true)}
      />
      <TodoList
        todos={todos}
        showDone={showDone}
        setTodos={setTodos}
        onToggleDone={handleToggleDone}
      />
      <AddTodoDialog
        open={addDialogOpen}
        onClose={() => setAddDialogOpen(false)}
        onCreate={handleCreate}
      />
    </div>
  );
}
