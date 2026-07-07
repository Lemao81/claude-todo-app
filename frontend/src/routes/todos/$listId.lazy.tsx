import { createLazyFileRoute, getRouteApi } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { createTodo, deleteTodo, updateTodoDone } from '#/api/todoApi';
import { AddTodoDialog } from '#/components/todolist/AddTodoDialog';
import { TodoList } from '#/components/todolist/TodoList';
import { TodoListHeader } from '#/components/todolist/TodoListHeader';
import type { TodoDto } from '#/types/todo';

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
    }
  }

  async function handleCreate(text: string, description: string | null) {
    const todo = await createTodo(text, description, Number(listId));
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
        onDelete={handleDelete}
      />
      <AddTodoDialog
        open={addDialogOpen}
        onClose={() => setAddDialogOpen(false)}
        onCreate={handleCreate}
      />
    </div>
  );
}
