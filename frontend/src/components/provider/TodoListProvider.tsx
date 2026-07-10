import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { updateTodoList } from '#/api/todoListApi';
import { useTodoLists } from '#/components/provider/TodoListsProvider';
import { useTodos } from '#/components/provider/TodosProvider';
import type { TodoListDto } from '#/types/todoList';

interface TodoListContextValue {
  listId: number;
  listName: string;
  editingList: boolean;
  renameList: (name: string) => void;
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
  const { refreshTodoLists } = useTodoLists();
  const { editingTodo, stopEditing } = useTodos();
  const [listName, setListName] = useState(list.name);
  const [editingList, setEditingList] = useState(false);

  useEffect(() => {
    if (editingTodo) {
      setEditingList(false);
    }
  }, [editingTodo]);

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

  const startEditingList = (): void => {
    stopEditing();
    setEditingList(true);
  };

  const stopEditingList = useCallback((): void => setEditingList(false), []);

  return (
    <TodoListContext.Provider
      value={{
        listId: list.id,
        listName,
        editingList,
        renameList,
        startEditingList,
        stopEditingList,
      }}
    >
      {children}
    </TodoListContext.Provider>
  );
}
