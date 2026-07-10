import CloseIcon from '@mui/icons-material/Close';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { useTodoList } from '#/components/provider/TodoListProvider';
import { useDebounce } from '#/hooks/useDebounce';

export function EditTodoListPanel() {
  const { listName, renameList, stopEditingList } = useTodoList();
  const [nameInput, setNameInput] = useState(listName);
  const debouncedName = useDebounce(nameInput);

  useEffect(() => {
    if (debouncedName === listName) {
      return;
    }

    renameList(debouncedName);
  }, [debouncedName, listName, renameList]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        stopEditingList();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [stopEditingList]);

  return (
    <Card variant="outlined" sx={{ width: 520, flexShrink: 0 }}>
      <CardContent>
        <Stack
          direction="row"
          sx={{ alignItems: 'center', justifyContent: 'space-between', mb: 1 }}
        >
          <Typography variant="h6">Edit Todo List</Typography>
          <Tooltip title="Close" enterDelay={500} enterNextDelay={500}>
            <IconButton aria-label="Close edit panel" size="small" onClick={stopEditingList}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
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
    </Card>
  );
}
