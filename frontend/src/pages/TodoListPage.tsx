import Box from '@mui/material/Box';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Stack from '@mui/material/Stack';
import { useEffect, useState } from 'react';
import { AddTodoDialog } from '#/components/todolist/AddTodoDialog';
import { EditPanelSlot } from '#/components/todolist/EditPanelSlot';
import { TodoList } from '#/components/todolist/TodoList';
import { TodoListHeader } from '#/components/todolist/TodoListHeader';
import { useTodoList } from '#/providers/TodoListProvider';
import { useTodos } from '#/providers/TodosProvider';
import { CONTENT_MAX_WIDTH } from '#/utils/constants';

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
      {/* biome-ignore lint/a11y/noStaticElementInteractions: presentational background dismiss area */}
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: keyboard dismissal handled via Escape in edit panels */}
      <div onClick={handleAreaClick}>
        <Box sx={{ maxWidth: CONTENT_MAX_WIDTH }}>
          <TodoListHeader
            showDone={showDone}
            onShowDoneChange={setShowDone}
            onAddClick={() => setAddDialogOpen(true)}
          />
        </Box>
        <Stack direction="row" sx={{ gap: 3, alignItems: 'flex-start' }} onClick={handleAreaClick}>
          <Box sx={{ maxWidth: CONTENT_MAX_WIDTH, flex: 1 }}>
            <TodoList showDone={showDone} />
          </Box>
          <EditPanelSlot />
        </Stack>
        <AddTodoDialog open={addDialogOpen} onClose={() => setAddDialogOpen(false)} />
      </div>
    </ClickAwayListener>
  );
}
