import CloseIcon from '@mui/icons-material/Close';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlined';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { ConfirmationDialog } from '#/components/shared/ConfirmationDialog';
import { EditPanelCard } from '#/components/todolist/EditPanelCard';
import { PanelHeaderRow } from '#/components/todolist/PanelHeaderRow';
import { useDebounce } from '#/hooks/useDebounce';
import { useTodoList } from '#/providers/TodoListProvider';

export function EditTodoListPanel() {
  const { listName, renameList, deleteList, stopEditingList } = useTodoList();
  const [nameInput, setNameInput] = useState(listName);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const debouncedName = useDebounce(nameInput);

  useEffect(() => {
    if (debouncedName === listName) {
      return;
    }

    renameList(debouncedName);
  }, [debouncedName, listName, renameList]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape' && !deleteDialogOpen) {
        stopEditingList();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [stopEditingList, deleteDialogOpen]);

  return (
    <EditPanelCard variant="outlined">
      <CardContent>
        <PanelHeaderRow>
          <Typography variant="h6">Edit Todo List</Typography>
          <Stack direction="row" sx={{ alignItems: 'center' }}>
            <Tooltip title="Delete Todo List">
              <IconButton
                aria-label="Delete todo list"
                size="small"
                onClick={() => setDeleteDialogOpen(true)}
              >
                <DeleteOutlineIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Close">
              <IconButton aria-label="Close edit panel" size="small" onClick={stopEditingList}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Stack>
        </PanelHeaderRow>
        <TextField
          required
          margin="dense"
          label="Name"
          fullWidth
          value={nameInput}
          error={!nameInput.trim()}
          onChange={(e) => setNameInput(e.target.value)}
        />
      </CardContent>
      <ConfirmationDialog
        open={deleteDialogOpen}
        title="Delete Todo List"
        message={`Are you sure you want to delete the list "${listName}" and all of its todos?`}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={deleteList}
      />
    </EditPanelCard>
  );
}
