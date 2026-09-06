import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import { useRef } from 'react';
import { EditTodoListPanel } from '#/components/todolist/EditTodoListPanel';
import { EditTodoPanel } from '#/components/todolist/EditTodoPanel';
import { useTodoList } from '#/providers/TodoListProvider';
import { useTodos } from '#/providers/TodosProvider';
import type { TodoDto } from '#/types/todo';

const PANEL_FADE_TIMEOUT = 130;

type ActivePanel = { kind: 'todo'; todo: TodoDto } | { kind: 'list' };

function resolveActivePanel(editingTodo: TodoDto | null, editingList: boolean): ActivePanel | null {
  if (editingTodo) {
    return { kind: 'todo', todo: editingTodo };
  }

  if (editingList) {
    return { kind: 'list' };
  }

  return null;
}

export function EditPanelSlot() {
  const { editingTodo } = useTodos();
  const { editingList } = useTodoList();
  const activePanel = resolveActivePanel(editingTodo, editingList);
  const lastActivePanel = useRef<ActivePanel | null>(null);

  if (activePanel) {
    lastActivePanel.current = activePanel;
  }

  const panel = activePanel ?? lastActivePanel.current;

  return (
    <Fade in={Boolean(activePanel)} timeout={PANEL_FADE_TIMEOUT} unmountOnExit>
      <Box sx={{ flexShrink: 0 }}>
        {panel?.kind === 'todo' && <EditTodoPanel key={panel.todo.id} todo={panel.todo} />}
        {panel?.kind === 'list' && <EditTodoListPanel />}
      </Box>
    </Fade>
  );
}
