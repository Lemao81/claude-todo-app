import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { type SubmitEvent, useState } from 'react';
import { useTodos } from '#/providers/TodosProvider';

type AddTodoDialogProps = {
  open: boolean;
  onClose: () => void;
};

export function AddTodoDialog({ open, onClose }: AddTodoDialogProps) {
  const { addTodo } = useTodos();
  const [text, setText] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);

  function handleClose() {
    setText('');
    setDescription('');
    onClose();
  }

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);

    try {
      await addTodo(text.trim(), description.trim() || null);
      handleClose();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm" data-cy="add-todo-dialog">
      <form onSubmit={handleSubmit}>
        <DialogTitle data-cy="add-todo-dialog-title">Add ToDo</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            label="Text"
            fullWidth
            value={text}
            onChange={(e) => setText(e.target.value)}
            slotProps={{ htmlInput: { 'data-cy': 'add-todo-text-input' } }}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            multiline
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            slotProps={{ htmlInput: { 'data-cy': 'add-todo-description-input' } }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            type="submit"
            variant="contained"
            disabled={submitting || !text.trim()}
            data-cy="add-todo-submit"
          >
            Add
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
