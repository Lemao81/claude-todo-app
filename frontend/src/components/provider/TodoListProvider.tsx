import { useNavigate } from '@tanstack/react-router';
import { createContext, useCallback, useContext, useState } from 'react';
import { deleteTodoList, updateTodoList } from '#/api/todoListApi';
import { useTodoLists } from '#/components/provider/TodoListsProvider';
import type { TodoListDto } from '#/types/todoList';
import { showSnackbar } from '#/utils/snackbar';

interface TodoListContextValue {
  listId: number;
  listName: string;
  editingList: boolean;
  renameList: (name: string) => void;
  deleteList: () => Promise<void>;
  startEditingList: () => void;
  stopEditingList: () => void;
}

const TodoListContext = createContext<TodoListContextValue | null>(null);

export function useTodoList(): TodoListContextValue {
  const context = useContext(TodoListContext);
  if (!context) {
    throw new Error('useTodoList must be used within a TodoListProvider');
  }

  return context;
}

type TodoListProviderProps = {
  list: TodoListDto;
  children: React.ReactNode;
};

export function TodoListProvider({ list, children }: TodoListProviderProps) {
  const navigate = useNavigate();
  const { refreshTodoLists } = useTodoLists();
  const [listName, setListName] = useState(list.name);
  const [editingList, setEditingList] = useState(false);

  const renameList = useCallback(
    (name: string): void => {
      setListName(name);

      if (!name.trim()) {
        return;
      }

      updateTodoList(list.id, name).then((updated): void => {
        if (updated) {
          refreshTodoLists();
        }
      });
    },
    [list.id, refreshTodoLists],
  );

  async function deleteList(): Promise<void> {
    const success = await deleteTodoList(list.id);
    if (!success) {
      showSnackbar('Failed to delete todo list', 'error');

      return;
    }

    await refreshTodoLists();
    navigate({ to: '/todos' });
    showSnackbar('Todo list deleted');
  }

  const startEditingList = (): void => setEditingList(true);

  const stopEditingList = useCallback((): void => setEditingList(false), []);

  return (
    <TodoListContext.Provider
      value={{
        listId: list.id,
        listName,
        editingList,
        renameList,
        deleteList,
        startEditingList,
        stopEditingList,
      }}
    >
      {children}
    </TodoListContext.Provider>
  );
}
