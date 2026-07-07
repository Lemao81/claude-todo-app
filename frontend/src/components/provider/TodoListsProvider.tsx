import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useUserInfo } from '#/components/provider/UserInfoProvider';
import type { TodoListDto } from '#/types/todoList';
import { apiFetch } from '#/utils/apiClient';
import { logFetchError } from '#/utils/logHelper';

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
  const [todoLists, setTodoLists] = useState<TodoListDto[]>([]);

  const refreshTodoLists = useCallback(async (): Promise<void> => {
    const res = await apiFetch('/api/todolists');
    if (!res.ok) {
      await logFetchError(res, 'Failed to fetch todo lists');

      return;
    }

    setTodoLists(await res.json());
  }, []);

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
