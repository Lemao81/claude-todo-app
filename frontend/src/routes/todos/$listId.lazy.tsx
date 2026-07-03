import { DragDropProvider } from '@dnd-kit/react';
import type { DragEndEvent } from '@dnd-kit/react';
import { isSortable } from '@dnd-kit/react/sortable';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import { createLazyFileRoute, getRouteApi } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { AddTodoDialog } from '#/components/AddTodoDialog';
import { TodoCard } from '#/components/TodoCard';
import type { TodoDto } from '#/types/todo';
import { apiFetch } from '#/utils/apiClient';
import { arrayMove } from '#/utils/arrayMove';
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

  async function handleDragEnd(event: DragEndEvent) {
    const { source } = event.operation;
    if (event.canceled || !isSortable(source)) {
      return;
    }

    const oldIndex = source.initialIndex;
    const newIndex = source.index;
    if (oldIndex === newIndex) {
      return;
    }

    const previous = todos;
    const reorderedVisible = arrayMove(visibleTodos, oldIndex, newIndex);
    let visibleCursor = 0;
    const reordered = todos.map((todo) =>
      showDone || !todo.done ? reorderedVisible[visibleCursor++] : todo,
    );
    setTodos(reordered);

    const res = await apiFetch('/api/todos/reorder', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderedIds: reordered.map((todo) => todo.id) }),
    });

    if (!res.ok) {
      await logFetchError(res, 'Failed to reorder todos');

      setTodos(previous);
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

  const visibleTodos = showDone ? todos : todos.filter((todo) => !todo.done);

  return (
    <div style={{ maxWidth: 640 }}>
      <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5">My Todos - {list.name}</Typography>
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
      <DragDropProvider onDragEnd={handleDragEnd}>
        {visibleTodos.map((todo, index) => (
          <TodoCard key={todo.id} todo={todo} index={index} onToggleDone={handleToggleDone} />
        ))}
      </DragDropProvider>
      <AddTodoDialog
        open={addDialogOpen}
        onClose={() => setAddDialogOpen(false)}
        onCreate={handleCreate}
      />
    </div>
  );
}
