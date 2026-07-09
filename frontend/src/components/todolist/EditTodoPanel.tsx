import CloseIcon from '@mui/icons-material/Close';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { useDebounce } from '#/hooks/useDebounce';
import type { TodoDto } from '#/types/todo';

type EditTodoPanelProps = {
  todo: TodoDto;
  onChange: (id: number, text: string, description: string) => void;
  onClose: () => void;
};

export function EditTodoPanel({ todo, onChange, onClose }: EditTodoPanelProps) {
  const [text, setText] = useState(todo.text);
  const [description, setDescription] = useState(todo.description ?? '');
  const debouncedText = useDebounce(text);
  const debouncedDescription = useDebounce(description);

  useEffect(() => {
    if (debouncedText === todo.text && debouncedDescription === (todo.description ?? '')) {
      return;
    }

    onChange(todo.id, debouncedText, debouncedDescription);
  }, [debouncedText, debouncedDescription, todo, onChange]);

  return (
    <Card variant="outlined" sx={{ width: 520, flexShrink: 0 }}>
      <CardContent>
        <Stack
          direction="row"
          sx={{ alignItems: 'center', justifyContent: 'space-between', mb: 1 }}
        >
          <Typography variant="h6">Edit ToDo</Typography>
          <Tooltip title="Close" enterDelay={500} enterNextDelay={500}>
            <IconButton aria-label="Close edit panel" size="small" onClick={onClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
        <TextField
          required
          margin="dense"
          label="Text"
          fullWidth
          value={text}
          error={!text.trim()}
          onChange={(e) => setText(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Description"
          fullWidth
          multiline
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </CardContent>
    </Card>
  );
}
