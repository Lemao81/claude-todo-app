import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { createTodo, deleteTodo, reorderTodos, updateTodo, updateTodoDone } from '#/services/api/todoApi';
import type { TodoDto } from '#/types/todo';
import { showSnackbar } from '#/services/state/snackbar';

interface TodosContextValue {
  todos: TodoDto[];
  editingTodo: TodoDto | null;
  editingTodoId: number | null;
  addTodo: (text: string, description: string | null) => Promise<void>;
  editTodo: (id: number, text: string, description: string) => void;
  toggleTodoDone: (id: number, done: boolean) => Promise<void>;
  removeTodo: (id: number) => Promise<void>;
  reorder: (reordered: TodoDto[]) => Promise<void>;
  startEditingTodo: (id: number) => void;
  stopEditingTodo: () => void;
}

const TodosContext = createContext<TodosContextValue | null>(null);

export function useTodos(): TodosContextValue {
  const context = useContext(TodosContext);
  if (!context) {
    throw new Error('useTodos must be used within a TodosProvider');
  }

  return context;
}

type TodosProviderProps = {
  listId: number;
  initialTodos: TodoDto[];
  children: React.ReactNode;
};

export function TodosProvider({ listId, initialTodos, children }: TodosProviderProps) {
  const [todos, setTodos] = useState<TodoDto[]>(initialTodos);
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const editingTodo = todos.find((todo) => todo.id === editingTodoId) ?? null;

  useEffect(() => {
    setTodos(initialTodos);
    setEditingTodoId(null);
  }, [initialTodos]);

  async function addTodo(text: string, description: string | null): Promise<void> {
    const todo = await createTodo(text, description, listId);
    if (!todo) {
      showSnackbar('Failed to add todo', 'error');

      return;
    }

    setTodos((prev) => [...prev, todo]);
    showSnackbar('Todo added');
  }

  const editTodo = useCallback((id: number, text: string, description: string): void => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, text, description: description || null } : todo,
      ),
    );

    if (!text.trim()) {
      return;
    }

    updateTodo(id, text, description || null);
  }, []);

  async function toggleTodoDone(id: number, done: boolean): Promise<void> {
    setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, done } : todo)));

    const success = await updateTodoDone(id, done);
    if (!success) {
      setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, done: !done } : todo)));
    }
  }

  async function removeTodo(id: number): Promise<void> {
    const previous = todos;
    setTodos((prev) => prev.filter((todo) => todo.id !== id));

    const success = await deleteTodo(id);
    if (!success) {
      setTodos(previous);
      showSnackbar('Failed to delete todo', 'error');

      return;
    }

    showSnackbar('Todo deleted');
  }

  async function reorder(reordered: TodoDto[]): Promise<void> {
    const previous = todos;
    setTodos(reordered);

    const success = await reorderTodos(reordered.map((todo) => todo.id));
    if (!success) {
      setTodos(previous);
    }
  }

  const startEditingTodo = (id: number): void => setEditingTodoId(id);
  const stopEditingTodo = useCallback((): void => setEditingTodoId(null), []);

  return (
    <TodosContext.Provider
      value={{
        todos,
        editingTodo,
        editingTodoId,
        addTodo,
        editTodo,
        toggleTodoDone,
        removeTodo,
        reorder,
        startEditingTodo,
        stopEditingTodo,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
}
