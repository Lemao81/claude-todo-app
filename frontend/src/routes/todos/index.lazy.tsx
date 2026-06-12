import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import { createLazyFileRoute, getRouteApi } from '@tanstack/react-router';
import { useState } from 'react';
import { AddTodoDialog } from '#/components/AddTodoDialog';
import { TodoCard } from '#/components/TodoCard';
import type { TodoDto } from '#/routes/todos/index';
import { logFetchError } from '#/utils/logHelper';

export const Route = createLazyFileRoute('/todos/')({
  component: RouteComponent,
});

const routeApi = getRouteApi('/todos/');

function RouteComponent() {
  const [todos, setTodos] = useState<TodoDto[]>(routeApi.useLoaderData());
  const [showDone, setShowDone] = useState(true);
  const [addDialogOpen, setAddDialogOpen] = useState(false);

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

  async function handleCreate(text: string, description: string | null) {
    const res = await fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, description }),
    });

    if (!res.ok) {
      await logFetchError(res, 'Failed to create todo');

      throw new Error('Failed to create todo');
    }

    const todo: TodoDto = await res.json();
    setTodos((prev) => [...prev, todo]);
  }

  const visibleTodos = showDone ? todos : todos.filter((todo) => !todo.done);

  return (
    <div style={{ maxWidth: 640 }}>
      <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5">My Todos</Typography>
        <Stack direction="row" sx={{ alignItems: 'center', gap: 1 }}>
          <FormControlLabel
            control={<Switch checked={showDone} onChange={(e) => setShowDone(e.target.checked)} />}
            label="Show done"
          />
          <Button variant="contained" onClick={() => setAddDialogOpen(true)}>
            Add ToDo
          </Button>
        </Stack>
      </Stack>
      {visibleTodos.map((todo) => (
        <TodoCard key={todo.id} todo={todo} onToggleDone={handleToggleDone} />
      ))}
      <AddTodoDialog
        open={addDialogOpen}
        onClose={() => setAddDialogOpen(false)}
        onCreate={handleCreate}
      />
    </div>
  );
}
