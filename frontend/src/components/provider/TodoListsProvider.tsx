import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { fetchTodoLists } from '#/api/todoListApi';
import { useSnackbar } from '#/components/provider/SnackbarProvider';
import { useUserInfo } from '#/components/provider/UserInfoProvider';
import type { TodoListDto } from '#/types/todoList';

interface TodoListsContextValue {
  todoLists: TodoListDto[];
  refreshTodoLists: () => Promise<void>;
}

const TodoListsContext = createContext<TodoListsContextValue | null>(null);

export function useTodoLists(): TodoListsContextValue {
  const context = useContext(TodoListsContext);
  if (!context) {
    throw new Error('useTodoLists must be used within a TodoListsProvider');
  }

  return context;
}

export function TodoListsProvider({ children }: { children: React.ReactNode }) {
  const { userInfo } = useUserInfo();
  const { showSnackbar } = useSnackbar();
  const [todoLists, setTodoLists] = useState<TodoListDto[]>([]);

  const refreshTodoLists = useCallback(async (): Promise<void> => {
    const lists = await fetchTodoLists();
    if (!lists) {
      showSnackbar('Failed to load todo lists', 'error');

      return;
    }

    setTodoLists(lists);
  }, [showSnackbar]);

  useEffect(() => {
    if (!userInfo) {
      setTodoLists([]);

      return;
    }

    refreshTodoLists();
  }, [userInfo, refreshTodoLists]);

  return (
    <TodoListsContext.Provider value={{ todoLists, refreshTodoLists }}>
      {children}
    </TodoListsContext.Provider>
  );
}
