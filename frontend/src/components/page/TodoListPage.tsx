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
  const { editingTodo } = useTodos();
  const { editingList } = useTodoList();
  const [showDone, setShowDone] = useState(true);
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  return (
    <div>
      <div style={{ maxWidth: 800 }}>
        <TodoListHeader
          showDone={showDone}
          onShowDoneChange={setShowDone}
          onAddClick={() => setAddDialogOpen(true)}
        />
      </div>
      <Stack direction="row" sx={{ gap: 3, alignItems: 'flex-start' }}>
        <div style={{ maxWidth: 800, flex: 1 }}>
          <TodoList showDone={showDone} />
        </div>
        {editingTodo && <EditTodoPanel key={editingTodo.id} todo={editingTodo} />}
        {editingList && <EditTodoListPanel />}
      </Stack>
      <AddTodoDialog open={addDialogOpen} onClose={() => setAddDialogOpen(false)} />
    </div>
  );
}
