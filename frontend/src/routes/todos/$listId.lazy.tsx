import Stack from '@mui/material/Stack';
import { createLazyFileRoute, getRouteApi, useNavigate } from '@tanstack/react-router';
import { useCallback, useEffect, useState } from 'react';
import { deleteTodoList, updateTodoList } from '#/api/todoListApi';
import { useSnackbar } from '#/components/provider/SnackbarProvider';
import { useTodoLists } from '#/components/provider/TodoListsProvider';
import { TodosProvider, useTodos } from '#/components/provider/TodosProvider';
import { ConfirmationDialog } from '#/components/ConfirmationDialog';
import { AddTodoDialog } from '#/components/todolist/AddTodoDialog';
import { EditTodoListPanel } from '#/components/todolist/EditTodoListPanel';
import { EditTodoPanel } from '#/components/todolist/EditTodoPanel';
import { TodoList } from '#/components/todolist/TodoList';
import { TodoListHeader } from '#/components/todolist/TodoListHeader';
import type { TodoListDto } from '#/types/todoList';

export const Route = createLazyFileRoute('/todos/$listId')({
  component: RouteComponent,
});

const routeApi = getRouteApi('/todos/$listId');

function RouteComponent() {
  const { listId } = routeApi.useParams();
  const { list, todos: loadedTodos } = routeApi.useLoaderData();

  return (
    <TodosProvider listId={Number(listId)} initialTodos={loadedTodos}>
      <TodoListPage key={list.id} list={list} />
    </TodosProvider>
  );
}

function TodoListPage({ list }: { list: TodoListDto }) {
  const navigate = useNavigate();
  const { refreshTodoLists } = useTodoLists();
  const { showSnackbar } = useSnackbar();
  const { editingTodo, stopEditing } = useTodos();
  const [showDone, setShowDone] = useState(true);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editListOpen, setEditListOpen] = useState(false);
  const [listName, setListName] = useState(list.name);

  useEffect(() => {
    if (editingTodo) {
      setEditListOpen(false);
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

  const closeEditList = useCallback((): void => setEditListOpen(false), []);

  function handleEditListClick(): void {
    stopEditing();
    setEditListOpen(true);
  }

  async function handleDeleteList() {
    const success = await deleteTodoList(list.id);
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
          listName={listName}
          showDone={showDone}
          onShowDoneChange={setShowDone}
          onAddClick={() => setAddDialogOpen(true)}
          onEditClick={handleEditListClick}
          onDeleteClick={() => setDeleteDialogOpen(true)}
        />
      </div>
      <Stack direction="row" sx={{ gap: 3, alignItems: 'flex-start' }}>
        <div style={{ maxWidth: 800, flex: 1 }}>
          <TodoList showDone={showDone} />
        </div>
        {editingTodo && <EditTodoPanel key={editingTodo.id} todo={editingTodo} />}
        {editListOpen && (
          <EditTodoListPanel name={listName} onRename={renameList} onClose={closeEditList} />
        )}
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
