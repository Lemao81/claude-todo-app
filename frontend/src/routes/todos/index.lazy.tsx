import Typography from '@mui/material/Typography';
import { createLazyFileRoute, getRouteApi } from '@tanstack/react-router';
import { useState } from 'react';
import { TodoCard } from '#/components/TodoCard';
import type { TodoDto } from '#/routes/todos/index';
import { logFetchError } from '#/utils/logHelper';

export const Route = createLazyFileRoute('/todos/')({
  component: RouteComponent,
});

const routeApi = getRouteApi('/todos/');

function RouteComponent() {
  const [todos, setTodos] = useState<TodoDto[]>(routeApi.useLoaderData());

  async function handleToggleDone(id: number, done: boolean) {
    setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, done } : todo)));

    const res = await fetch(`/api/todos/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ done }),
    });

    if (!res.ok) {
      await logFetchError(res, `Failed to update todo ${id}`);

      setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, done: !done } : todo)));
    }
  }

  return (
    <div style={{ maxWidth: 640 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        My Todos
      </Typography>
      {todos.map((todo) => (
        <TodoCard key={todo.id} todo={todo} onToggleDone={handleToggleDone} />
      ))}
    </div>
  );
}
