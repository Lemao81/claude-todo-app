import AddIcon from '@mui/icons-material/Add';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { createTodoList } from '#/api/todoListApi';
import { useSnackbar } from '#/components/provider/SnackbarProvider';
import { useTodoLists } from '#/components/provider/TodoListsProvider';
import { AddTodoListDialog } from '#/components/sidebar/AddTodoListDialog';

export function SidebarAddTodoListItem() {
  const navigate = useNavigate();
  const { refreshTodoLists } = useTodoLists();
  const { showSnackbar } = useSnackbar();
  const [dialogOpen, setDialogOpen] = useState(false);

  async function handleCreate(name: string) {
    const list = await createTodoList(name);
    if (!list) {
      showSnackbar('Failed to create todo list', 'error');

      return;
    }

    await refreshTodoLists();
    navigate({ to: '/todos/$listId', params: { listId: String(list.id) } });
    showSnackbar('Todo list created');
  }

  return (
    <>
      <ListItem disablePadding>
        <ListItemButton sx={{ pl: 4 }} onClick={() => setDialogOpen(true)}>
          <ListItemIcon sx={{ minWidth: 32 }}>
            <AddIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="New List" slotProps={{ primary: { sx: { fontSize: '0.875rem' } } }} />
        </ListItemButton>
      </ListItem>
      <AddTodoListDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onCreate={handleCreate}
      />
    </>
  );
}
