import ClickAwayListener from '@mui/material/ClickAwayListener';
import Stack from '@mui/material/Stack';
import { useState } from 'react';
import { useTodoList } from '#/components/provider/TodoListProvider';
import { useTodos } from '#/components/provider/TodosProvider';
import { AddTodoDialog } from '#/components/todolist/AddTodoDialog';
import { EditTodoListPanel } from '#/components/todolist/EditTodoListPanel';
import { EditTodoPanel } from '#/components/todolist/EditTodoPanel';
import { TodoList } from '#/components/todolist/TodoList';
import { TodoListHeader } from '#/components/todolist/TodoListHeader';

export function TodoListPage() {
  const { editingTodo, stopEditing } = useTodos();
  const { editingList } = useTodoList();
  const [showDone, setShowDone] = useState(true);
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  const handleAreaClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (e.target === e.currentTarget) {
      stopEditing();
    }
  };

  return (
    <div>
      <div style={{ maxWidth: 800 }}>
        <TodoListHeader
          showDone={showDone}
          onShowDoneChange={setShowDone}
          onAddClick={() => setAddDialogOpen(true)}
        />
      </div>
      <ClickAwayListener onClickAway={stopEditing}>
        <Stack direction="row" sx={{ gap: 3, alignItems: 'flex-start' }} onClick={handleAreaClick}>
          <div style={{ maxWidth: 800, flex: 1 }}>
            <TodoList showDone={showDone} />
          </div>
          {editingTodo && <EditTodoPanel key={editingTodo.id} todo={editingTodo} />}
          {editingList && <EditTodoListPanel />}
        </Stack>
      </ClickAwayListener>
      <AddTodoDialog open={addDialogOpen} onClose={() => setAddDialogOpen(false)} />
    </div>
  );
}
