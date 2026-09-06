import Box from '@mui/material/Box';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Fade from '@mui/material/Fade';
import Stack from '@mui/material/Stack';
import { useEffect, useRef, useState } from 'react';
import { AddTodoDialog } from '#/components/todolist/AddTodoDialog';
import { EditTodoListPanel } from '#/components/todolist/EditTodoListPanel';
import { EditTodoPanel } from '#/components/todolist/EditTodoPanel';
import { TodoList } from '#/components/todolist/TodoList';
import { TodoListHeader } from '#/components/todolist/TodoListHeader';
import { useTodoList } from '#/providers/TodoListProvider';
import { useTodos } from '#/providers/TodosProvider';
import type { TodoDto } from '#/types/todo';
import { CONTENT_MAX_WIDTH } from '#/utils/constants';

export function TodoListPage() {
  const { editingTodo, stopEditingTodo } = useTodos();
  const { editingList, stopEditingList } = useTodoList();
  const [showDone, setShowDone] = useState(true);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const lastEditingTodo = useRef<TodoDto | null>(null);

  if (editingTodo) {
    lastEditingTodo.current = editingTodo;
  }

  const panelTodo = editingTodo ?? lastEditingTodo.current;

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
          <Fade in={Boolean(editingTodo)} timeout={130} unmountOnExit>
            <Box sx={{ flexShrink: 0 }}>
              {panelTodo && <EditTodoPanel key={panelTodo.id} todo={panelTodo} />}
            </Box>
          </Fade>
          {editingList && <EditTodoListPanel />}
        </Stack>
        <AddTodoDialog open={addDialogOpen} onClose={() => setAddDialogOpen(false)} />
      </div>
    </ClickAwayListener>
  );
}
