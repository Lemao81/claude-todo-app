import { useQuery, useQueryClient } from '@tanstack/react-query';
import { createContext, useCallback, useContext } from 'react';
import { todoListsQueryOptions } from '#/services/api/todoListApi';
import { useUserInfo } from '#/components/providers/UserInfoProvider';
import type { TodoListDto } from '#/types/todoList';
import { shouldRetryQuery } from '#/utils/apiClient';

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
  const queryClient = useQueryClient();
  const { data: loadedTodoLists } = useQuery({
    ...todoListsQueryOptions,
    enabled: !!userInfo,
    retry: shouldRetryQuery,
  });
  const todoLists = userInfo ? (loadedTodoLists ?? []) : [];

  const refreshTodoLists = useCallback(
    (): Promise<void> =>
      queryClient.invalidateQueries({ queryKey: todoListsQueryOptions.queryKey }),
    [queryClient],
  );

  return (
    <TodoListsContext.Provider value={{ todoLists, refreshTodoLists }}>
      {children}
    </TodoListsContext.Provider>
  );
}
