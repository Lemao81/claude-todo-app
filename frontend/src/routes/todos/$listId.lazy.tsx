import Stack from '@mui/material/Stack';
import { createLazyFileRoute, getRouteApi, useNavigate } from '@tanstack/react-router';
import { useCallback, useEffect, useState } from 'react';
import { createTodo, deleteTodo, updateTodo, updateTodoDone } from '#/api/todoApi';
import { deleteTodoList } from '#/api/todoListApi';
import { useSnackbar } from '#/components/provider/SnackbarProvider';
import { useTodoLists } from '#/components/provider/TodoListsProvider';
import { AddTodoDialog } from '#/components/todolist/AddTodoDialog';
import { DeleteTodoListConfirmationDialog } from '#/components/todolist/DeleteTodoListConfirmationDialog';
import { EditTodoPanel } from '#/components/todolist/EditTodoPanel';
import { TodoList } from '#/components/todolist/TodoList';
import { TodoListHeader } from '#/components/todolist/TodoListHeader';
import type { TodoDto } from '#/types/todo';

export const Route = createLazyFileRoute('/todos/$listId')({
  component: RouteComponent,
});

const routeApi = getRouteApi('/todos/$listId');

function RouteComponent() {
  const navigate = useNavigate();
  const { refreshTodoLists } = useTodoLists();
  const { showSnackbar } = useSnackbar();
  const { listId } = routeApi.useParams();
  const { list, todos: loadedTodos } = routeApi.useLoaderData();
  const [todos, setTodos] = useState<TodoDto[]>(loadedTodos);
  const [showDone, setShowDone] = useState(true);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const editingTodo = todos.find((todo) => todo.id === editingTodoId) ?? null;

  useEffect(() => setTodos(loadedTodos), [loadedTodos]);

  const handleEditChange = useCallback((id: number, text: string, description: string): void => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, text, description: description || null } : todo)),
    );

    if (!text.trim()) {
      return;
    }

    updateTodo(id, text, description || null);
  }, []);

  async function handleToggleDone(id: number, done: boolean) {
    setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, done } : todo)));

    const success = await updateTodoDone(id, done);
    if (!success) {
      setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, done: !done } : todo)));
    }
  }

  async function handleDelete(id: number) {
    const previous = todos;
    setTodos((prev) => prev.filter((todo) => todo.id !== id));

    const success = await deleteTodo(id);
    if (!success) {
      setTodos(previous);

      return;
    }

    showSnackbar('Todo deleted', 'info', 2000);
  }

  async function handleCreate(text: string, description: string | null) {
    const todo = await createTodo(text, description, Number(listId));
    setTodos((prev) => [...prev, todo]);
    showSnackbar('Todo added', 'info', 2000);
  }

  async function handleDeleteList() {
    const success = await deleteTodoList(Number(listId));
    if (!success) {
      return;
    }

    await refreshTodoLists();
    navigate({ to: '/todos' });
    showSnackbar('Todo list deleted', 'info', 2000);
  }

  return (
    <div>
      <div style={{ maxWidth: 800 }}>
        <TodoListHeader
          listName={list.name}
          showDone={showDone}
          onShowDoneChange={setShowDone}
          onAddClick={() => setAddDialogOpen(true)}
          onDeleteClick={() => setDeleteDialogOpen(true)}
        />
      </div>
      <Stack direction="row" sx={{ gap: 3, alignItems: 'flex-start' }}>
        <div style={{ maxWidth: 800, flex: 1 }}>
          <TodoList
            todos={todos}
            showDone={showDone}
            editingTodoId={editingTodoId}
            setTodos={setTodos}
            onToggleDone={handleToggleDone}
            onEdit={setEditingTodoId}
            onDelete={handleDelete}
          />
        </div>
        {editingTodo && (
          <EditTodoPanel
            key={editingTodo.id}
            todo={editingTodo}
            onChange={handleEditChange}
            onClose={() => setEditingTodoId(null)}
          />
        )}
      </Stack>
      <AddTodoDialog
        open={addDialogOpen}
        onClose={() => setAddDialogOpen(false)}
        onCreate={handleCreate}
      />
      <DeleteTodoListConfirmationDialog
        open={deleteDialogOpen}
        listName={list.name}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDeleteList}
      />
    </div>
  );
}
