import Stack from '@mui/material/Stack';
import { createLazyFileRoute, getRouteApi, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { deleteTodoList } from '#/api/todoListApi';
import { useSnackbar } from '#/components/provider/SnackbarProvider';
import { TodoListProvider, useTodoList } from '#/components/provider/TodoListProvider';
import { useTodoLists } from '#/components/provider/TodoListsProvider';
import { TodosProvider, useTodos } from '#/components/provider/TodosProvider';
import { ConfirmationDialog } from '#/components/ConfirmationDialog';
import { AddTodoDialog } from '#/components/todolist/AddTodoDialog';
import { EditTodoListPanel } from '#/components/todolist/EditTodoListPanel';
import { EditTodoPanel } from '#/components/todolist/EditTodoPanel';
import { TodoList } from '#/components/todolist/TodoList';
import { TodoListHeader } from '#/components/todolist/TodoListHeader';

export const Route = createLazyFileRoute('/todos/$listId')({
  component: RouteComponent,
});

const routeApi = getRouteApi('/todos/$listId');

function RouteComponent() {
  const { listId } = routeApi.useParams();
  const { list, todos: loadedTodos } = routeApi.useLoaderData();

  return (
    <TodosProvider listId={Number(listId)} initialTodos={loadedTodos}>
      <TodoListProvider key={list.id} list={list}>
        <TodoListPage />
      </TodoListProvider>
    </TodosProvider>
  );
}

function TodoListPage() {
  const navigate = useNavigate();
  const { refreshTodoLists } = useTodoLists();
  const { showSnackbar } = useSnackbar();
  const { editingTodo } = useTodos();
  const { listId, listName, editingList } = useTodoList();
  const [showDone, setShowDone] = useState(true);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  async function handleDeleteList() {
    const success = await deleteTodoList(listId);
    if (!success) {
      showSnackbar('Failed to delete todo list', 'error');

      return;
    }

    await refreshTodoLists();
    navigate({ to: '/todos' });
    showSnackbar('Todo list deleted');
  }

  return (
    <div>
      <div style={{ maxWidth: 800 }}>
        <TodoListHeader
          showDone={showDone}
          onShowDoneChange={setShowDone}
          onAddClick={() => setAddDialogOpen(true)}
          onDeleteClick={() => setDeleteDialogOpen(true)}
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
      <ConfirmationDialog
        open={deleteDialogOpen}
        title="Delete Todo List"
        message={`Are you sure you want to delete the list "${listName}" and all of its todos?`}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDeleteList}
      />
    </div>
  );
}
