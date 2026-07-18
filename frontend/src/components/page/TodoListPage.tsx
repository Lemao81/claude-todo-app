import ClickAwayListener from '@mui/material/ClickAwayListener';
import Stack from '@mui/material/Stack';
import { useEffect, useState } from 'react';
import { useTodoList } from '#/components/provider/TodoListProvider';
import { useTodos } from '#/components/provider/TodosProvider';
import { AddTodoDialog } from '#/components/todolist/AddTodoDialog';
import { EditTodoListPanel } from '#/components/todolist/EditTodoListPanel';
import { EditTodoPanel } from '#/components/todolist/EditTodoPanel';
import { TodoList } from '#/components/todolist/TodoList';
import { TodoListHeader } from '#/components/todolist/TodoListHeader';

export function TodoListPage() {
  const { editingTodo, stopEditingTodo } = useTodos();
  const { editingList, stopEditingList } = useTodoList();
  const [showDone, setShowDone] = useState(true);
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  useEffect(() => {
    if (editingTodo) {
      stopEditingList();
    }
  }, [editingTodo, stopEditingList]);

  useEffect(() => {
    if (editingList) {
      stopEditingTodo();
    }
  }, [editingList, stopEditingTodo]);

  const stopEditingAll = (): void => {
    stopEditingTodo();
    stopEditingList();
  };

  const handleAreaClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (e.target === e.currentTarget) {
      stopEditingAll();
    }
  };

  return (
    <ClickAwayListener onClickAway={stopEditingAll}>
      <div onClick={handleAreaClick}>
        <div style={{ maxWidth: 800 }}>
          <TodoListHeader
            showDone={showDone}
            onShowDoneChange={setShowDone}
            onAddClick={() => setAddDialogOpen(true)}
          />
        </div>
        <Stack direction="row" sx={{ gap: 3, alignItems: 'flex-start' }} onClick={handleAreaClick}>
          <div style={{ maxWidth: 800, flex: 1 }}>
            <TodoList showDone={showDone} />
          </div>
          {editingTodo && <EditTodoPanel key={editingTodo.id} todo={editingTodo} />}
          {editingList && <EditTodoListPanel />}
        </Stack>
        <AddTodoDialog open={addDialogOpen} onClose={() => setAddDialogOpen(false)} />
      </div>
    </ClickAwayListener>
  );
}
