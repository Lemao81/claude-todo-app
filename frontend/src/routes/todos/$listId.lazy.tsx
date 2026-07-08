import { createLazyFileRoute, getRouteApi, useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { createTodo, deleteTodo, updateTodoDone } from '#/api/todoApi';
import { deleteTodoList } from '#/api/todoListApi';
import { useSnackbar } from '#/components/provider/SnackbarProvider';
import { useTodoLists } from '#/components/provider/TodoListsProvider';
import { AddTodoDialog } from '#/components/todolist/AddTodoDialog';
import { DeleteTodoListConfirmationDialog } from '#/components/todolist/DeleteTodoListConfirmationDialog';
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

  useEffect(() => setTodos(loadedTodos), [loadedTodos]);

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
    <div style={{ maxWidth: 800 }}>
      <TodoListHeader
        listName={list.name}
        showDone={showDone}
        onShowDoneChange={setShowDone}
        onAddClick={() => setAddDialogOpen(true)}
        onDeleteClick={() => setDeleteDialogOpen(true)}
      />
      <TodoList
        todos={todos}
        showDone={showDone}
        setTodos={setTodos}
        onToggleDone={handleToggleDone}
        onDelete={handleDelete}
      />
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
